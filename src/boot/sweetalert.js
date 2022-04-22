import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)

const alertSuccess = function (title, text) {
    return Vue.swal({
        icon: 'success',
        title: title,
        text: text,
        timer: 1000,
        showConfirmButton: false
    })
}
const alertCF = async function (title, text, confirmText, cancelText, icon) {
    let options =
    {
        icon: icon ? icon : 'success',
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonColor: "#247ba0",
        cancelButtonColor: "#fcb131",
        confirmButtonText: confirmText ? confirmText : "確定",
        cancelButtonText: cancelText ? cancelText : "取消",
    };
    let resp = false;
    await Vue.swal(options).then((res) => { resp = res.value ? true : false })
    return resp
}

const alertWarning = function (title, text) {
    return Vue.swal({
        icon: 'warning',
        title: title,
        text: text,
    })
}
const alertError = function (title, text) {
    return Vue.swal({
        icon: 'error',
        title: title,
        text: text,
    })
}
const alertHError = function (title, html) {
    return Vue.swal({
        icon: 'error',
        title: title,
        html: html,
    })
}
const alertConfirm = async function (title, text) {
    let options =
    {
        title: title ? title : `確定要刪除嗎？`,
        text: text ? text : null,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#C10015",
        cancelButtonColor: "#26A69A",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
    };
    let resp = false;
    await Vue.swal(options).then((res) => { resp = res.value ? true : false })

    return resp
}
const alertHtml = async function (title, html) {
    let options =
    {
        title: title ? title : `確定要刪除嗎？`,
        html: html,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#C10015",
        cancelButtonColor: "#26A69A",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
    };
    let resp = false;
    await Vue.swal(options).then((res) => { resp = res.value ? true : false })

    return resp
}

window.alertSuccess = alertSuccess;
window.alertCF = alertCF;
window.alertWarning = alertWarning;
window.alertError = alertError;
window.alertHError = alertHError;
window.alertConfirm = alertConfirm;
window.alertHtml = alertHtml;
