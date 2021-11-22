import Vue from 'vue'
import { Row, Col, Message, Form, FormItem, Button, Input, Link, Image, Container, Header, Aside, Main, Footer, Backtop, Dropdown, DropdownMenu, DropdownItem, Menu, Submenu, MenuItemGroup, MenuItem, Slider, Carousel, CarouselItem, Tooltip, Select, Option, Divider, Pagination, Tag, Table, TableColumn, Tabs, TabPane, Collapse, CollapseItem, Popover, Card, ButtonGroup } from 'element-ui'
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Link)
Vue.use(Image)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Backtop)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Slider)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Option)
Vue.use(Divider)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Popover)
Vue.use(Card)
Vue.use(ButtonGroup)

Vue.prototype.$message = function(type, msg) {
  Message({
    showClose: true, // 关闭按钮是否显示
    message: msg, // 提示信息
    type: type // 状态
  })
}
