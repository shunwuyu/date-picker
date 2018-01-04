import $ from 'jquery';
import template from '../template/picker.hbs';
import EasyDate from './EasyDate';

export default class DatePicker {
  /**
   * 
   * @param {dom} target 
   * @param {Object} options 
   *    @param {Boolean|null} options.confirm 是否有确认按钮
   *    @param {String|null} options.format 日期格式，默认为`yyyy-mm-dd` 无大小写分别
   */
  constructor (target, options = {}) {
    this.target = target;
    console.log(options);
    this.createElement(options);
  }

  createElement (options) {
    options = Object.assign({}, options);
    let today = options.today = new EasyDate(0, options);
    let start = options.start = options.start? new EasyDate(options.start, options): today;
    let end = options.end = options.end? new EasyDate(options.end, options): null;
    // console.log(end);
    let current = start.clone();
    current.setDate(1);
    let months = [];
    for (let i = 0; i < 2; i++) {
      let month = 
        DatePicker.createMonthObject(
          current, today, start, end);
      months.push(month);
      current.add('1m');
    }
    options.months = months;
    // console.log(options);
    let item = $(template(options));
    console.log(item);
    item.appendTo(document.body);
  }

  show () {
  }

  hide () {
  }

  static createMonthObject(current, today, start, end) {
    return current.toObject(today, start, end);
  }
}