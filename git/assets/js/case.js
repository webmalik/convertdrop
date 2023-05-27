$(document).ready(function () {
  $(".carousel").hide();
  $(".quan").on("click", function (event) {
    event.preventDefault();
    $(".quan").removeClass("active");
    $(this).addClass("active");
  });
  $("#quick").on("click", function () {
    $(this).toggleClass("active");
  });
  $("#open").on("click", function () {
    $(".cases").hide();
    $(".carousel").fadeIn();
    start();
  });

  const cells = 100;
  const items = [
    { name: "Headphones", img: "assets/images/item.png", chance: 100 }
  ];

  function getItem() {
    let item;

    while (!item) {
      const chance = Math.floor(Math.random() * 100);
      $.each(items, function (index, elm) {
        if (chance < elm.chance && !item) item = elm;
      });
    }

    return item;
  }

  function generateItems() {
    $(".carousel .scope .item").remove();

    const scope = $(".scope");

    for (let i = 0; i < cells; i++) {
      const item = getItem();
      const div = $("<div></div>");
      div.addClass("item");
      div.attr("data-item", JSON.stringify(item));
      div.html('<img src="' + item.img + '" alt="" />');

      scope.append(div);
    }
  }

  generateItems();

  let isStarted = false;
  let isFirstStart = true;

  function start() {
    if (isStarted) return;
    else isStarted = true;

    if (!isFirstStart) generateItems();
    else isFirstStart = false;

    var gapSum = 0;
    $(".scope").each(function() {
      var containerWidth = $(this).width();
      var itemsCount = $(this).children().length;
      var gapWidth = (itemsCount - 1) * 2; // Учитываем ширину "gap" между элементами
      var totalGap = containerWidth - gapWidth;
      gapSum += totalGap;
    });
    
    console.log("Сумма gap в блоке .scope: " + gapSum + "px");

    const scope = $(".scope");
    const carouselWidth = $(".scope").width();
    const itemWidth = $(".scope .item").first().outerWidth();
    const gap = $(".scope").css('gap');
    const iw = Math.floor(((itemWidth * cells) - gapSum) / 2 - itemWidth / 2);
    const targetPosition = Math.floor(carouselWidth / 2 - itemWidth / 2);
    console.log(iw);
    console.log(carouselWidth);
    console.log(itemWidth);
    console.log(targetPosition);

    scope.css({
      transform: "translate3d(-" + iw + "px, 0, 0)",
      transition: "transform 7s cubic-bezier(.31,.46,.28,1)",
    });

    setTimeout(function () {
      scope.addClass("active");
    }, 0);

    // setTimeout(function() {
    // scope.removeClass("active");
    // const currentPosition = parseInt(scope.css("transform").split(",")[4]);
    // const correction = targetPosition - currentPosition % itemWidth;
    // scope.css({
    // transform: "translate3d(-" + (currentPosition + correction) + "px, 0, 0)",
    // transition: "none"
    // });
    // }, 0);
  }
});
