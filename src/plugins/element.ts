import Vue from 'vue';
import {
    Container,
    Aside,
    Main,
    Header,
    Button,
    Menu,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Input,
    Checkbox,
    Dialog,
    Notification,
    Loading,
    Message,
    Alert,
    Form,
    FormItem,
    Popover
} from 'element-ui';

[
    Container,
    Aside,
    Main,
    Header,
    Button,
    Menu,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Input,
    Checkbox,
    Dialog,
    Loading,
    Alert,
    Form,
    FormItem,
    Popover
].forEach((Comp) => Vue.use(Comp));

Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$fullLoading = () => Loading.service({lock: true, background: 'rgba(0, 0, 0, 0.7)'});
Vue.prototype.$message = Message;
