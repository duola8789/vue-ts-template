export interface TypeMailItem {
    id: string;
    templateId: string;
    btnText?: string;
    subject: string;
    receivers: string[];
    carbonCopies?: string[];
    body: string[];
}

export interface TypeMailConfig {
    [keys: string]: TypeMailItem[];
}
