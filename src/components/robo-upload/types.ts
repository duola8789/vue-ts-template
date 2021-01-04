import {ElUpload} from 'element-ui/types/upload';

export interface TypeUpload extends ElUpload {
    handleRemove: any;
    uploadFiles: any;
    $refs: any;
    triggerUpload: any;
}
