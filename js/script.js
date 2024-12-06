
let popup = document.querySelector('.popup');
let girl = document.querySelector('.girl');
let out_table = document.querySelector('.out_table');
let table = document.querySelector('.table_content');
let slider_content = document.querySelector('.slider_content');
let slider_left_arrow = document.querySelector('.slider_left_arrow');
let slider_right_arrow = document.querySelector('.slider_right_arrow');
let slider_table = null;
let cur_slider_table = -3;
let sliderStep = 60;
let sliderStepMax = 0;

let curStep = 0;
var stepPath = [0, 12, 21, 30, 39, 49, 57, 65, 77, 87, 100];
    
function step(to, step){
    to = step?+curStep + step:to;
    if(to < 0) to = 0;
    else if(to >= stepPath.length-1) to = stepPath.length-1;
    girl.style.setProperty('offset-distance', stepPath[to] + '%');
    girl.style.setProperty('transition-duration', (Math.abs(curStep - to) + 's'));
    curStep = to;
}

function renderTable(){
    out_table.classList.remove('table_content_overflow');
    let ratingArray = data.rating?data.rating:[];
    let friendsArray = data.friends?data.friends:[];
    let friend;
    let str = `<div class="table">`;
        ratingArray.forEach(line => {
            friend = friendsArray.find((fr)=>{
                return fr.id === line.id
            })
            str += `<div class="row ${friend?'friend':''}">
                        <div class="cell cell_first">${line.id}</div>
                        <div class="cell picture"><img src="../img/cell_block.png"/></div>
                        <div class="cell fio">${line.name} ${line.lastName}</div>
                        <div class="cell cell_last">${line.id}</div>
                    </div>`
        });
        str += `</div>`;
        if(ratingArray.length >= 7) out_table.classList.add('table_content_overflow');
    return str;
}

function openPopup(open, force){
    let tableSrc = renderTable();
    table.innerHTML = tableSrc;
    if(force || open.target == popup) popup.classList.remove('open')
    else if(open == 1) popup.classList.add('open')
}    

function renderSlider(){
    let ratingArray = data.rating?data.rating:[];
    let friendsArray = data.friends?data.friends:[];
    let friend;
    let str = `<div class="slider_table">`;
        ratingArray.forEach(line => {
            friend = friendsArray.find((fr)=>{
                return fr.id === line.id
            })
            console.log('friend', friend)
            str += `<div>
                        <div class="slider_block">
                            ${friend?'<img src="img/plus.png" class="plus"/>':''}
                            <img src="img/user_01.png" class="user"/>
                        </div>
                    </div>`
        });
        str += `</div>`;
        sliderStepMax = sliderStep*(ratingArray.length-8);
    return str;
}

function initSliderArrows(){
    if(cur_slider_table < -1*sliderStep){
        slider_right_arrow.classList.remove('hide')
    }else{
        slider_right_arrow.classList.add('hide')
    }
    if(sliderStepMax - Math.abs(cur_slider_table) < 0){
        slider_left_arrow.classList.add('hide')
    }else{
        slider_left_arrow.classList.remove('hide')
    }
}

function sliderInit(){
    let sliderSrc = renderSlider();
    slider_content.innerHTML = sliderSrc;
    slider_table = document.querySelector('.slider_table');
    initSliderArrows();
}

function sliderTo(to){
    cur_slider_table += to*sliderStep;
    slider_table.style.left = cur_slider_table + 'px';
    initSliderArrows();
}

sliderInit();



