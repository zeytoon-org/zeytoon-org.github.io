//
// https://github.com/rostamkhani/ZeytoonArtFrame
// 
var ZeytoonArtFrame = function (elContent, imgUrl, options = null) {

    var MyOptions;
    var _this = this;

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    var GetImageSize = function(imageUrl,callBack)
    {
        var img = document.createElement("img");
        img.onload = function (event)
        {
            // console.log("natural:", img.naturalWidth, img.naturalHeight);
            // console.log("width,height:", img.width, img.height);
            // console.log("offsetW,offsetH:", img.offsetWidth, img.offsetHeight);            
            if(callBack != null) callBack({existImage : true , width : img.width , height : img.height } );
        }
        img.onerror = function(event)
        {
            if(callBack != null) callBack({existImage : false , width : 0 , height : 0 });
        }
        img.src = imageUrl;
    }

    this.Default_Options = {
        WidthImage: 'auto',
        HeightImage: '500px',
        FrameWidth: 'auto',
        FrameStyleNumber: 1,
        FrameCorner: false,
        FrameCenter: false
    };

    if (elContent == null) {
        alert('Pleas Select Element For Content!');
        return;
    }




    this.Init = function () {


        //root.style.setProperty('--mouse-x', e.clientX + "px");
        //console.log(MyOptions);
        var tempFrame =
`<div style="{ZArtFrame}">
    <div style="{ZArtPictureBox}">
        <img style="{ZArtPictureBoxImg}" src="IMAGE_URL" alt="">
        <div style="{BorderShadow}"></div>
    </div>
    <div style="{ZFrame} {ZFrameTop}"></div>
    <div style="{ZFrame} {ZFrameBottom}"></div>
    <div style="{ZFrame} {ZFrameRight}"></div>
    <div style="{ZFrame} {ZFrameLeft}"></div>
    TEMP_CORNER
    TEMP_CENTER
</div>`;

        var tempCorner =
   `<div style="{ZFCorner} {ZFCornerUL}"></div>
    <div style="{ZFCorner} {ZFCornerUR}"></div>
    <div style="{ZFCorner} {ZFCornerDR}"></div>
    <div style="{ZFCorner} {ZFCornerDL}"></div>`;

        var tempCenter =
   `<div style="{ZFCenter} {ZFCenterU}"></div> 
    <div style="{ZFCenter} {ZFCenterR}"></div>
    <div style="{ZFCenter} {ZFCenterD}"></div>
    <div style="{ZFCenter} {ZFCenterL}"></div>`;

        var styles = {
            ZArtFrame : 'position: relative; width: fit-content; height: fit-content; -webkit-box-shadow: 2px 5px 17px 2px rgba(0,0,0,0.96); box-shadow: 2px 5px 7px 5px rgba(0,0,0,0.7); background-color: black; ', /* transform: perspective(1000px) rotateY(45deg)  */
            ZArtPictureBox: ' width: fit-content; height: {--ImageHeight}; position: relative; padding: {--FrameWidth};',
            ZArtPictureBoxImg: 'width: {--ImageWidth}; height: {--ImageHeight};',
            BorderShadow: 'width: calc(100% - 2 * {--FrameWidth} ); height: calc(100% - 2 * {--FrameWidth} ); top: 0; bottom: 0; left: 0; right: 0; margin: auto; position: absolute; -webkit-box-shadow: inset 1px 2px 3px 2px rgba(0,0,0,0.7); box-shadow: inset 1px 2px 3px 2px rgba(0,0,0,0.7);',

            ZFrame: 'background-image: {--FrameImage}; background-size: auto {--FrameWidth}; background-repeat: repeat-x; position: absolute;',
            ZFrameTop: 'width: 100%;height: {--FrameWidth}; left: 0;top: 0;',
            ZFrameBottom: 'width: 100%; height: {--FrameWidth}; transform: scale(-1); top: calc(100% - {--FrameWidth});',
            ZFrameRight: 'transform: rotate(90deg); width: {--_Height}; height: {--FrameWidth}; right: calc( {--_Height} / -2 + ( {--FrameWidth} / 2));   top: calc(50% - {--FrameWidth} / 2); clip-path: polygon(0 0, 100% 0px , calc(100% - {--FrameWidth}) 100%, {--FrameWidth} {--FrameWidth} );',
            ZFrameLeft: 'width: {--_Height}; height: {--FrameWidth}; clip-path: polygon(0 0, 100% 0px, calc(100% - {--FrameWidth}) 100%, {--FrameWidth} {--FrameWidth});    transform: rotate(-90deg); left: calc( {--_Height} / -2 + ( {--FrameWidth} / 2)); top: calc(50% - {--FrameWidth} / 2);',

            ZFCorner: 'background-image: {--FCornerImage}; background-size: calc( {--h1} * {--FrameWidth}/ {--h2}) calc( {--h1}* {--FrameWidth}/ {--h2}); background-repeat: no-repeat; width: calc( {--h1}* {--FrameWidth}/ {--h2}); height: calc( {--h1}* {--FrameWidth}/ {--h2}); position: absolute;',
            ZFCornerUL: 'left: 0px; top: 0px;',
            ZFCornerUR: 'transform: rotate(90deg); right: 0; top: 0;',
            ZFCornerDR: 'transform: rotate(180deg); right: 0; bottom: 0;',
            ZFCornerDL: 'transform: rotate(270deg); left: 0; bottom: 0;',

            ZFCenter: 'width: 500px; height: 500px; position: absolute; margin: auto; background-image: {--FCenterImage}; background-size: auto {--FrameWidth};    background-position:center top; background-repeat: no-repeat;',
            ZFCenterU: 'top: 0; left: 0; right: 0;',
            ZFCenterR: 'top: 0; bottom: 0; right: 0; transform: rotate(90deg);',
            ZFCenterD: 'bottom: 0; left: 0; right: 0; transform: rotate(180deg);',
            ZFCenterL: 'top: 0; bottom: 0; left: 0; transform: rotate(-90deg);',
        }


        var dOpt = _this.Default_Options;
        if (options != null) {
            MyOptions = options;
            for (item in dOpt) {
                if (MyOptions[item] == undefined) {
                    MyOptions[item] = dOpt[item]
                }
            }
        }
        else {
            MyOptions = dOpt;
        }



        var frameWidth_px;
        var frameWidth_int;
        if (MyOptions.FrameWidth.toLowerCase() == 'auto') {
            var h = parseInt(MyOptions.HeightImage, 10);
            frameWidth_int = parseInt(h / 8);
            frameWidth_px = frameWidth_int + 'px';
        }
        else
        {
            frameWidth_int = parseInt(MyOptions.FrameWidth, 10);
            frameWidth_px = MyOptions.FrameWidth;
        }


        var tempR = tempFrame.replace('IMAGE_URL', imgUrl);

        if (MyOptions.FrameCorner == true) {
            tempR = tempR.replace('TEMP_CORNER', tempCorner);
        }
        else {
            tempR = tempR.replace('TEMP_CORNER', "");
        }

        if (MyOptions.FrameCenter == true) {            
            tempR = tempR.replace('TEMP_CENTER', tempCenter);
        }
        else {
            tempR = tempR.replace('TEMP_CENTER', "");
        }

        var _Height = parseInt(MyOptions.HeightImage, 10) + 2 * frameWidth_int;
        var optionKeyValue =
        [
             { key : '{--ImageWidth}' , value : MyOptions.WidthImage},
             { key : '{--ImageHeight}' , value : MyOptions.HeightImage},
             { key : '{--FrameWidth}' , value : frameWidth_px},
             { key : '{--_Height}' , value :  _Height + 'px'},
             { key : '{--FrameImage}' , value : "url('Image/Frame/Frame_(FRAME_STYLE_NUM).png')".replace('FRAME_STYLE_NUM', MyOptions.FrameStyleNumber)},
             { key : '{--FCornerImage}' , value : "url('Image/Frame/Frame_(FRAME_STYLE_NUM)_Corner.png')".replace('FRAME_STYLE_NUM', MyOptions.FrameStyleNumber)},
             { key : '{--FCenterImage}' , value : "url('Image/Frame/Frame_(FRAME_STYLE_NUM)_Center.png')".replace('FRAME_STYLE_NUM', MyOptions.FrameStyleNumber)}      
        ];


        for(item in styles)
        {
            var style1 = styles[item];
            optionKeyValue.forEach(element => {
                style1 = style1.replaceAll(element.key,element.value);
            });
            tempR = tempR.replaceAll('{KEY}'.replace('KEY',item),style1)
        }

        var h1,h2;
        if (MyOptions.FrameCorner == true)
        {
            GetImageSize("Image/Frame/Frame_(FRAME_STYLE_NUM)_Corner.png".replace('FRAME_STYLE_NUM', MyOptions.FrameStyleNumber),
            function(e)
            {
                if(e.existImage == true)
                {
                    h1 = e.height;

                    GetImageSize("Image/Frame/Frame_(FRAME_STYLE_NUM).png".replace('FRAME_STYLE_NUM', MyOptions.FrameStyleNumber),
                    function(e)
                    {
                        h2 = e.height;
                        elContent.innerHTML = tempR.replaceAll('{--h1}',h1).replaceAll('{--h2}',h2);
                    });  
                }
                else
                {
                    elContent.innerHTML = tempR;
                }
            });            
        }
        else
        {
            elContent.innerHTML = tempR;
        }

    }
    this.Init(MyOptions);
}