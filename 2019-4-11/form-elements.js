/**
 * 表单属性和方法
 * 
 * 文档中的表单是一个特殊集合 document.forms 中的成员。
 * document.forms 是一个命名集合：我们既可以使用名字也可以使用索引来获取表单。
 * 当我们有了一个表单，其中任何的元素都可以通过命名集合 form.elements 来获取到。
 * 
 * form标签中元素属性并不依赖于标签的结构。所有的元素，无论它们在表单中嵌套的有多么深，都可以通过 form.elements 获取到。
 */ 

const form = document.forms.my;
const elem = form.elements.one;
console.log(form, '获取document下的form表单中，有一个name叫my的表单'); 
console.log(elem, '获取my表单集合中有一个叫name属性叫one的元素');

const radio = form.elements.age;
/**
 * 需要注意的是可能会有多个名称相同的元素，在那种情况下 form.elements[name] 将会是一个集合
 * 返回的集合是一个伪数组
 */
console.log(radio, '获取my表单集合中有叫age属性的元素集合');
console.log(radio[0].value, '第一个名字叫age属性的按钮的值');

/** 
 * 更简短的方式：form.name
 * 
 * 我们可以通过 form[index/name] 来访问元素。
*/
const secondform = document.forms.secondForm;
const secondformInput = secondform.login;
console.log(secondformInput, '直接通过from.name进行访问');

/**
 * 反向引用：element.form
 * 对于任何元素，其对应的表单都可以通过 element.form 访问到。因此不仅表单可以引用所有元素，元素也可以引用表单。
 */
console.log(secondformInput.form, '这个是反向引用，通过form中的子元素进行访问顶层form元素');

/** 
 * input 和 textarea
 * 
 * 我们可以使用 input.value 或者 input.checked 来访问复选框的值。
 * 
 * 例如：
 * input.value = "New value";
 * textarea.value = "New text";
 * input.checked = true;            // 用于复选框或者单选按钮
 * 
 * 使用 textarea.value 而不是 textarea.innerHTML的原因：
 * textarea.innerHTML只是储存了最初在页面上的 HTML 内容，而不是当前的。
*/

/**
 * select 和 option
 * 
 * 一个 <select> 元素有 3 个重要的属性：
 * (1)select.options —— <option> 元素的集合，
 * (2)select.value —— 所选选项的值，
 * (3)select.selectedIndex —— 所选选项的索引。
 * 
 * 所以我们会有三种方式来设置一个 <select> 元素的值：
 * (1)找到所需要的 <option> 元素之后设置 option.selected 为 true。
 * (2)设置 select.value 为对应的值。
 * (3)设置 select.selectedIndex 为对应选项的索引
 */
const selectControl = secondform.elements.fruit;

/**
 * 这3种方式都是给select控件设置值
 */
selectControl.options[2].selected = true;
selectControl.selectedIndex = 2;
selectControl.value = 'banana';
console.log(selectControl);

/**
 * 新的选项
 * 
 * 在选项元素的规范中，有一个很不错的简短语法用来创建 <option> 元素：
 * option = new Option(text, value, defaultSelected, selected);
 * 参数：
 *     (1) text —— 选项中的文本
 *     (2) value —— 选项的默认值
 *     (3) defaultSelected —— 如果这个值是 true，那么 selected 属性就会默认创建
 *     (4) selected —— 如果这个值是true，那么这个选项就是已经被选择了
 */
const newOption = new Option('Orange', 'Orange', true, false);
selectControl.appendChild(newOption);
/**
 * 当然你也可以使用：selectControl.append(newOption);
 */