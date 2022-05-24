import MetaActionModel from './MetaAction.model';

export class OpenPageActionModel extends MetaActionModel {

    pageTitle: string;
    pageName: string;
    component: any;
    openData: any;

    constructor() {
        super();
        this.actionType = 3;
    }

    

}

export default OpenPageActionModel;