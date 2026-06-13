import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/mocha/mauve.css";
import { Theme } from "vitepress/dist/client/index.js";
import VersionSwitcher from './VersionSwitcher.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) { 
    app.component('VersionSwitcher', VersionSwitcher) 
  } 
} satisfies Theme;