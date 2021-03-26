import Request from 'ajax-maker';

export const {
  request,
  setting
} = new Request({
  codeMap: {
    suc_code: 200,
    err_code: -1
  },
  codeField: 'code'
});

export default request;
