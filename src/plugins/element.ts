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
  Message
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
  Dialog
].forEach((Comp) => Vue.use(Comp));

Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
