const BASE_URL = 'https://www.niddaa.com/backend/api/v1';
const image_link = 'https://www.niddaa.com/backend/public/img/app-icon/';
export const URLS = {
    image: image_link,
    GET_COUNTRIES: BASE_URL + '/countries',
    GET_CITIES: BASE_URL + '/cities',
    GET_SERVICES: BASE_URL + '/services?',
    SERVICE_TASK: BASE_URL + '/servicetasks?',
    GET_TASK: BASE_URL + '/get-tasks?',
    TASK_TYPES: BASE_URL + '/tasktypes?',
    GET_DELIVERY_TITLE: BASE_URL + '/get-delivery-title?',
    RIGHT_MENUS: BASE_URL + '/right-app-menus',
    CREATE_REQUEST: BASE_URL + '/user/create-api-request',
    SEND_OTP: BASE_URL + '/send-otp',
    CREATE_STORE: BASE_URL + '/create-store',
}