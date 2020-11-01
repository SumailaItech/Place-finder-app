export class Modal{
    constructor(contentId, fallBackText){
        this.fallBackText = fallBackText;
        this.contentTemplateEl = document.getElementById(contentId);
        this.modaltemplateEl = document.getElementById('modal-template');
    }

    show(){
        if('content' in document.createElement('template')){
            const modalElements = document.importNode(
                this.modaltemplateEl.content,
                true);

            this.modalElement = modalElements.querySelector('.modal');
            this.backdropEl = modalElements.querySelector('.backdrop');
            const contentElement = document.importNode(this.contentTemplateEl.content, true);

            this.modalElement.appendChild(contentElement);

            document.body.insertAdjacentElement('afterBegin', this.modalElement);
            document.body.insertAdjacentElement('afterBegin', this.backdropEl);
        }else{
            /// fallback code
            alert(this.fallBackText);
        }
    }

    hide(){
        if(this.modalElement){
            document.body.removeChild(this.modalElement);
            document.body.removeChild(this.backdropEl);
            this.modalElement = null;
            this.backdropEl = null;
        }
    }
}