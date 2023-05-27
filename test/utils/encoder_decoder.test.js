const encode_decode_util=require("../../utils/encoder_decoder");
const { expect } = require("chai");

const encoded_string="000001c";
const decoded_id="100";
describe("test_utils_encode", ()=>{
    it("test_utils_encode_success", ()=>{
        let encoded_string_result=encode_decode_util.encode(decoded_id);
        expect(encoded_string_result).to.be.equals(encoded_string);
    })
})

describe("test_utils_decode", ()=>{
    it("test_utils_decode_success", ()=>{
        let decoded_id_result=encode_decode_util.decode(encoded_string);
        expect(decoded_id_result.toString()).to.be.equals(decoded_id);
    })
})