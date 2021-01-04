<template>
    <el-upload
        ref="uploadEle"
        v-bind="$attrs"
        class="robo-uploader"
        action=""
        :multiple="multiple"
        :with-credentials="true"
        :auto-upload="false"
        :show-file-list="showFileList"
        :limit="uploadFileLimit"
        :file-list="uploadedFiles"
        :on-remove="onFileRemove"
        :on-change="onFileChange"
    >
        <el-button v-if="showUploadBtn" :icon="btnIcon" type="primary" class="upload-button">
            {{ btnLabel }}
        </el-button>
        <div
            v-if="showFileList"
            slot="file"
            slot-scope="{file}"
            class="upload-file-preview"
            :class="showUploadBtn ? '' : 'up'"
        >
            <i class="el-icon-paperclip"></i>
            <p class="upload-file-preview-name"><robo-overflow-text :content="file.name" /></p>
            <i class="el-icon-close" @click="delFile(file)" />
        </div>
    </el-upload>
</template>

<script lang="ts">
import {Component, Vue, Emit, Watch, Ref, Prop} from 'vue-property-decorator';

import RoboOverflowText from '@/components/robo/robo-overflow-text.vue';

import {ElUploadInternalFileDetail, FileListItem} from 'element-ui/types/upload';
import {TypeUpload} from './types';

@Component({
    components: {RoboOverflowText}
})
export default class RoboUpload extends Vue {
    @Prop({type: String, default: 'el-icon-upload2'}) btnIcon!: string;
    @Prop({type: String, default: '选择文件'}) btnLabel!: string;
    @Prop({type: Boolean, default: true}) uploadedVisible!: boolean;
    @Prop({type: Array, default: () => []}) uploadedFiles!: FileListItem[];

    @Ref() uploadEle!: TypeUpload;

    uploadingFiles: ElUploadInternalFileDetail[] = [];

    get uploadFileLimit() {
        return this.$attrs.limit && typeof +this.$attrs.limit === 'number' ? +this.$attrs.limit : Infinity;
    }

    get showUploadBtn() {
        return this.uploadingFiles.length < +this.uploadFileLimit;
    }

    get showFileList() {
        return this.$attrs['show-file-list'] != undefined ? this.$attrs['show-file-list'] : true;
    }

    get multiple() {
        return this.$attrs.multiple != undefined ? this.$attrs.multiple : this.uploadFileLimit > 1;
    }

    @Emit('on-change')
    emitFilesChange() {
        return [...this.uploadingFiles];
    }

    @Watch('uploadedFiles')
    uploadedFilesWatcher() {
        if (Array.isArray(this.uploadedFiles) && this.uploadedFiles.length > 0) {
            this.$nextTick(() => {
                this.uploadingFiles = [...this.uploadEle.uploadFiles];
            });
        }
    }

    @Watch('uploadingFiles')
    uploadingFilesWatcher(newVal: ElUploadInternalFileDetail[], oldValue: ElUploadInternalFileDetail[]) {
        if (!Array.isArray(newVal) && !Array.isArray(oldValue)) {
            return;
        }
        if (newVal.length === 0 && newVal.length === 0) {
            return;
        }
        this.emitFilesChange();
    }

    onFileChange(file: ElUploadInternalFileDetail) {
        // 由于 auto-upload 为 false 时，before-upload 钩子函数不会被调用，所以需要在次对文件格式进行校验
        if (this.$attrs.accept) {
            const accepts = this.$attrs.accept.split(',');
            const isValid = accepts.some((v) => {
                const type = v.startsWith('.') ? v.slice(1) : v;
                return file.raw.type.includes(type);
            });
            if (isValid) {
                this.uploadingFiles.push(file);
            } else {
                this.$message.error(`只能上传${this.$attrs.accept}格式的文件，请重试`);
                this.uploadEle.handleRemove(file);
            }
        }
    }

    onFileRemove(file: ElUploadInternalFileDetail) {
        const index = this.uploadingFiles.findIndex((v) => v.uid === file.uid);
        index > -1 && this.uploadingFiles.splice(index, 1);
    }

    delFile(file: ElUploadInternalFileDetail) {
        this.uploadEle.handleRemove(file);
    }

    clearFiles() {
        this.uploadEle.clearFiles();
        this.uploadingFiles = [];
    }

    // 通过外部触发图片上传框
    triggerUpload() {
        const uploadInner = this.uploadEle.$refs['upload-inner'];
        if (uploadInner) {
            const uploadInput = uploadInner.$refs.input;
            if (uploadInput) {
                uploadInput.click();
            }
        }
    }

    beforeDestroy() {
        if (this.uploadingFiles.length > 0) {
            for (const file of this.uploadingFiles) {
                this.uploadEle.abort(file);
            }
        }
    }
}
</script>

<style lang="scss">
.robo-uploader {
    position: relative;

    .el-upload {
        display: block;
        min-width: 128px;
        text-align: left;

        .upload-button {
            width: inherit;
        }
    }

    .el-upload-list {
        .el-upload-list__item {
            width: 172px;
            margin-top: 10px;
            transition: none !important;

            &:first-child {
                .upload-file-preview.up {
                    margin-top: -10px;
                }
            }

            .upload-file-preview {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                padding: 0 16px;
                background: #f7f7f7;
                border-radius: 4px;

                .upload-file-preview-name {
                    @include text-overflow();

                    flex: 1;
                    margin: 0 12px 0 6px;
                    font-size: 14px;
                    color: #38f;
                }

                .el-icon-close {
                    display: inline-block;
                    position: static;
                    font-size: 20px;
                }
            }

            &:hover {
                .upload-file-preview {
                    .el-icon-close {
                        color: #2f9fff;
                    }
                }
            }
        }
    }
}
</style>
