'use strict';

function dataObj(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
}
dataObj.prototype.render = function () {
    let renderTemplate = $('#photo-template').clone();
    renderTemplate.find('h2').text(this.title);
    renderTemplate.find('img').attr('src', this.image_url).attr('alt', this.description);
    renderTemplate.find('p').html(`${this.description} <br />${this.keyword} <br />${this.horns}`);
    renderTemplate.removeAttr('id')
    $('main').append(renderTemplate);
}

function gitObjData(callback) {
    let ajaxCon = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('./data/page-1.json', ajaxCon).then(data => {
        data.forEach(elem => {
            callback(elem)
        });
    });
}

function createAndRender(elem) {
    let newInst = new dataObj(elem.image_url, elem.title, elem.description, elem.keyword, elem.horns);
    if ($('select').val() === newInst.keyword) {
        newInst.render();
    }
}

function addOptions(elem) {
    let opt = $(`<option value = "${elem.keyword}">${elem.keyword}</option>`);
    let exist = false;
    $('option').each(function () {
        if (this.value === elem.keyword) {
            exist = true;
        }
    });

    if (!exist) {
        $('select').append(opt);
    }
}
$(function () {
    gitObjData(addOptions);
    $('select').on('change', function () {
        console.log('change');
        gitObjData(createAndRender);
    })
});