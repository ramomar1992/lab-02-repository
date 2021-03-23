'use strict';

function dataObj(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
}
dataObj.prototype.render = function () {
    let renderTemplate = $('#template').html();
    let html = Mustache.render(renderTemplate, this);
    return html;
}

function gitObjData(callback, path) {
    let ajaxCon = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax(path, ajaxCon).then(data => {
        data.forEach(elem => {
            callback(elem)
        });
    });
}

function createAndRender(elem) {
    let newInst = new dataObj(elem.image_url, elem.title, elem.description, elem.keyword, elem.horns);
    if ($('select').val() === newInst.keyword) {
        $('main').append(newInst.render());
    }
    if ($('select').val() === 'default') {
        $('main').append(newInst.render());
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
    let page = './data/page-1.json';
    gitObjData(createAndRender, page);
    gitObjData(addOptions, page);
    $('select').on('change', function () {
        $('main').html('');
        gitObjData(createAndRender, page);
    })
    $('button').on('click', function (event) {
        event.preventDefault();
        if ($(this).text() == 'Page 1') {
            page = './data/page-1.json';
        } else if ($(this).text() == 'Page 2') {
            page = './data/page-2.json';
        }
        $('main').html('');
        $('select').html('<option value="default">Filter by Keyword</option>');
        gitObjData(addOptions, page);
        gitObjData(createAndRender, page);

    });
});