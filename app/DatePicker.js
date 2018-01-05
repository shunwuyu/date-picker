import $ from 'jquery';
import template from '../template/picker.hbs';
import calendar from '../template/calendar.hbs';
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
    this.delegateEvent(options);
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
    this.$el = item;
    this.lastMonth = current;
    setTimeout(() => {
      item.removeClass('out');
    }, 10);
  }

  delegateEvent(options) {
    console.log(this.$el);
    this.$el
      .on('click', 'li:not(.disabled, .empty)', this.onClick.bind(this))
      .on('click', '.tqb-dp-close-button', () => {
        this.$el.addClass('out');
      })
      .on('transitionend', () => {
        this.$el.toggleClass('hide', this.$el.hasClass('out'));
      })
    
    this.$el
      .find('.tqb-dp-container')
      .on('scroll', event => {
        let container = event.target;
        // scrollHeight 内容高度  $(container).height 对比
        // scrollTop滚动过的距离
        // offsetHeight 在父中的高度

        if (container.scrollHeight - container.scrollTop <= container.offsetHeight + 10) {
          let item = calendar(DatePicker.createMonthObject(this.lastMonth, options.today, options.start, options.end));
          $(container).append(item);
          this.lastMonth.add('+1m');
        }
      })
  }

  onClick (event) {
    let li = $(event.currentTarget);
    if (li.hasClass('select')) {
      li.removeClass('select');
      return;
    }
    li.addClass('select');
    // console.log(this);
    // if (!this.options.confirm) {
      this.confirm();
    // }
  }

  confirm () {
    // console.log(this.$el.find('.select'));
    let value = this.$el.find('.select').data('date')
    this.target.val(value);
    this.hide();
  }

  show () {
    let options = this.target.data();
    this.$el.removeClass('hide');
    setTimeout(() => {
      this.$el.removeClass('out');
    }, 10);
  }

  hide () {
    this.$el.addClass('out');
  }

  static createMonthObject(current, today, start, end) {
    return current.toObject(today, start, end);
  }
}