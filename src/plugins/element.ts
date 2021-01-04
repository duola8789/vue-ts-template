import Vue from 'vue';
import {
    Container,
    Header,
    Main,
    Aside,
    Menu,
    MenuItem,
    Submenu,
    Button,
    Input,
    Checkbox,
    Dialog,
    Notification,
    Loading,
    Message,
    Alert,
    Form,
    FormItem,
    MessageBox,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from 'element-ui';

[
    Container,
    Header,
    Main,
    Aside,
    Menu,
    MenuItem,
    Submenu,
    Button,
    Input,
    Checkbox,
    Dialog,
    Loading,
    Alert,
    Form,
    FormItem,
    Dropdown,
    DropdownMenu,
    DropdownItem
].forEach((Comp) => Vue.use(Comp));

Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$fullLoading = () => Loading.service({lock: true, background: 'rgba(0, 0, 0, 0.7)'});
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
