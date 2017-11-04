// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
//在这里传入ｐｄｆ的路径交给ｊｓ解决
var url = '/static/a.pdf';

// The workerSrc property shall be specified.
PDFJS.workerSrc = '/static/js/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1,
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    scalechanged = 0;

//动态修改ｐｄｆ的大小



/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  Pwidth = document.body.clientWidth;
  Pheight = document.body.clientHeight;  //获取当前屏幕用于动态修改ｐｄｆ大小


  // Using promise to fetch the page

  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport(scale);
    a = Pwidth/viewport.width;

    var view = page.getViewport(a);//重新修改ｐｄｆ的宽度


    canvas.height = view.height;
    canvas.width = view.width;
    //alert(view.height);

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: view
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = pageNum;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
//document.getElementById('prev').addEventListener('click', onPrevPage);

document.onclick = function (ev) {
  var oEvent = ev||event;
  if (oEvent.screenX<document.body.clientWidth/2){
    onPrevPage();
  }
  else {
    onNextPage();
  }
  //alert(oEvent.screenX+'，'+oEvent.screenY)
}

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}
//document.getElementById('next').addEventListener('click', onNextPage);

/**
 * Asynchronously downloads PDF.
 */
PDFJS.getDocument(url).then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page_count').textContent = pdfDoc.numPages;

  // Initial/first page rendering
  renderPage(pageNum);
});
