export class User {
    constructor(
        public uid: number = 0,
        public registrationdate: string = "",
        public name: string = "",
        public address: string = "",
        public phone: string = "",
        public curp: string = ""
    ) {}
}
