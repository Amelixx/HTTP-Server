$(document).ready(() => {
    $('.card-title').hide()
    $('.card-p').hide()
    let messages = 1;
    let cursed = false;
    $('.open').click((e) => {
        if (messages % 2 != 0) {
            $('.card').animate({ height: 400 }, 1000);
            $('.card-line').animate({ opacity: 1 }, 1000);
            $('.card-title').show()
            $('.card-p').show()
        }else if(messages % 2 == 0) {
            $('.card-line').animate({ opacity: -1 }, 1000);
            $('.card').animate({ height: 140 }, 1000, () => {
                $('.card-title').hide()
                $('.card-p').hide()
            });
        }
        messages++;
    });
    let toggle = 1; 
    //! Theme Change
    $('#palette').click((e) => {
        if (toggle % 2 != 0) {
            //* light theme
            $('.themebutton').attr("style", "background-color:#222222");
            $('#palette').attr("style", "color:#dadada");
            $('.open').attr("style", "background-color:#222222");
            $('#open').attr("style", "color:#dadada");
            $('body').attr("style", "background-color:#dadada");
            $('.intro-title').attr("style", "color:#033d33");
            $('.card-title').attr("style", "color:#000000");
            $('.card-p').attr("style", "color:#000000");
            $('.card-line').attr("style", "color:#000000");
            $('.intro-title-small').attr("style", "color:#b83e3e");
            $('.card').attr("style", "background-color: #dadada; box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3), -10px -10px 10px #ffffff");
            $('.card-img').attr("style", "box-shadow: 5px 5px 5px rgb(0, 0, 0, 0.3), -5px -5px 5px #ffffff");
            $('.title-h1').attr("style", "color:#000000");
            $('#welp').attr("style", "color:#000000");
            $('.card-title').hide();
            $('.card-p').hide();
        }else if (toggle % 2 == 0) {
            //! dark theme
            $('.themebutton').attr("style", "background-color:#dadada");
            $('#palette').attr("style", "color:#black");
            $('.open').attr("style", "background-color:#dadada");
            $('#open').attr("style", "color:#black");
            $('body').attr("style", "background-color:#222222");
            $('.intro-title').attr("style", "color:#ffffff");
            $('.card-title').attr("style", "color:#ffffff");
            $('.card-p').attr("style", "color:#ffffff");
            $('.card-line').attr("style", "color:#ffffff");
            $('.card').attr("style", "background-color: rgb(34, 34, 34); box-shadow: 10px 10px 10px rgb(0, 0, 0, 0.3), -10px -10px 10px rgba(98, 98, 98, 0.2);");
            $('.intro-title-small').attr("style", "color:#b83e3e");
            $('.card-img').attr("style", "box-shadow: 5px 5px 5px rgb(0, 0, 0, 0.3), -5px -5px 5px rgba(98, 98, 98, 0.2);");
            $('.title-h1').attr("style", "color:#ffffff");
            $('#welp').attr("style", "color:#ffffff");
            $('.card-title').hide();
            $('.card-p').hide();
        }
        toggle++;
    });
    $(document).keydown((e) => {
        if(e.which == 46){
            //! demon mode
            toggle = 2;
            $('#palette').click();
            alert('why did you do this to yourself?');
            $('.themebutton').attr("style", "background-color:red");
            $('.open').attr("style", "background-color:red");
            $('.card').attr("style","background-image: url('assets/Untitled-3.png'); background-position:center");
            $('body').attr("style","background-image: url('assets/Untitled-3.png'); mask-image: url('assets/mask2.png'); -webkit-mask-image: url('assets/mask2.png');");
            $('.intro-title').attr("style","color:red");
            $('.intro-title-small').attr("style", "color:#ffffff");
        }
        else if (e.which == 45){
            //* G mode
            toggle = 2;
            $('#palette').click();
            alert('excelent choice GAYness always prevails.');
            $('.themebutton').attr("style", "background-image:url('assets/Gmode.png')");
            $('.open').attr("style", "background-image:url('assets/Gmode.png')");
            $('.card').attr("style","background-image:url('assets/Gmode.png'); background-position:center");
            $('body').attr("style","background-image:url('assets/Gmode.png');");
            $('.intro-title-small').attr("style", "color:#ffffff");
        }
        else if (e.which == 49){
            toggle = 2;
            $('#palette').click();
        }
        else if (e.which == 50){
            toggle = 1;
            $('#palette').click();
        }
        else if (e.which == 87){
            window.open('./messages.html', '_blank');
        }
    });
});