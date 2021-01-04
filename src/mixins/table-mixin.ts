/**
 * Table
 */
import Vue from 'vue';
import {Component, Ref} from 'vue-property-decorator';
import {Formatter, Row, TableColumnCustom} from '@/utils/element-helper/types';
import {formatterElCellContent} from '@/utils';

@Component
export default class TableMixin extends Vue {
    @Ref() tableEle!: any;

    tableFormatter(formatter: Formatter, row: Row, column: TableColumnCustom) {
        return formatterElCellContent(formatter, row, column);
    }

    tableScrollToTop() {
        if (this.tableEle && this.tableEle.bodyWrapper) {
            this.tableEle.bodyWrapper.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    getCellClass({column}: any) {
        return `${column.property}-cell`;
    }

    getHeaderClass({column}: any) {
        return `${column.property}-header-cell`;
    }
}
