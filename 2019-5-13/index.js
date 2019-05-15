/**
 * hasClass
 * 判断是否有相关的class名字
 */
const hasClass = (el, className) => el.classList.contains(className);

console.log(hasClass(document.querySelector('p.special'), 'special'));
