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

            const modalElement = modalElements.querySelector('.modal');
            const backdropEl = modalElements.querySelector('.backdrop');
            const contentElement = document.importNode(this.contentTemplateEl.content, true);

            modalElement.appendChild(contentElement);

            document.body.insertAdjacentElement('afterBegin', modalElement);
            document.body.insertAdjacentElement('afterBegin', backdropEl);
        }else{
            /// fallback code
            alert(this.fallBackText);
        }
    }

    hide(){

    }
}