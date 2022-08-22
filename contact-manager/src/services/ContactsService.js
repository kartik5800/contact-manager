import axios from "axios";


export class ContsctsService {
    static serverURL = 'http://localhost:5000'


    static getGroups() {
        const dataURL = `${this.serverURL}/groups`;
        return axios.get(dataURL);
    }

    static getGroup(contact) {
        const groupId = contact.group;
        const dataURL = ` ${this.serverURL}/groups/${groupId}`;
        console.log('dsd', contact);
        return axios.get(dataURL);
    }


    static getAllContacts() {
        const dataURL = `${this.serverURL}/contacts`
        return axios.get(dataURL);
    }

    static getConatact(id) {
        const dataURL = `${this.serverURL}/contacts/${id}`
        return axios.get(dataURL);
    }


    static postContacts(contact) {
        const dataURL = `${this.serverURL}/contacts`
        return axios.post(dataURL, contact);
    }


    static updateContact(contact, id) {
        const dataURL = `${this.serverURL}/contacts/${id}`
        return axios.put(dataURL, contact)

    }

    static deleteContacts(id) {
        const dataURL = `${this.serverURL}/contacts/${id}`
        return axios.delete(dataURL)
    }
}