const btnSidebar = document.getElementById('menu-toggle');

if (btnSidebar) {
    /* toggle sidebar */
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
}