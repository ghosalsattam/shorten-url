const url_shortener_service=require("../../service/UrlShortener");
let sinon=require("sinon");
let url_db=require("../../db/url.db");
let encode_decode_util=require("../../utils/encoder_decoder");
let chai=require("chai");
let {expect} =require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
describe("test_UrlShortenerService", ()=>{
    let url_db_save_url_stub, url_db_fetch_latest_shortened_url_stub,
    encode_stub, decode_stub, validate_url_stub, fetch_shortened_url_for_original_url_stub,
    mongo_object_body, body;
    beforeEach(()=>{
        body={
            "original_url": "https://some-random-url.com"
        };
        mongo_object_body={
            _id: "6471d3ebd626d6642fcf474a",
            url_id: "0000000",
            original_url: "https://wikipedia0.com",
            createdAt: "2023-05-27T09:56:59.732+00:00",
            updatedAt: "2023-05-27T09:56:59.732+00:00",
            __v:0
        }
        url_db_save_url_stub=sinon.stub(url_db, "saveUrl");
        url_db_fetch_latest_shortened_url_stub=sinon.stub(url_db, "fetchLatestShortenedUrl");
        encode_stub=sinon.stub(encode_decode_util, "encode");
        decode_stub=sinon.stub(encode_decode_util, "decode");
        fetch_shortened_url_for_original_url_stub=sinon.stub(url_db, "fetchShortenedUrlForOriginalUrl");
        validate_url_stub=sinon.stub(url_shortener_service, "validateUrl");
    })
    afterEach(()=>{
        url_db_save_url_stub.restore();
        url_db_fetch_latest_shortened_url_stub.restore();
        encode_stub.restore();
        fetch_shortened_url_for_original_url_stub.restore();
        decode_stub.restore();
        validate_url_stub.restore();
    })
    it("test_UrlShortenerService_success_for_first_url", async()=>{
        url_db_save_url_stub.resolves(mongo_object_body);
        url_db_fetch_latest_shortened_url_stub.resolves();
        encode_stub.resolves();
        decode_stub.resolves();
        fetch_shortened_url_for_original_url_stub.resolves();
        validate_url_stub.resolves(true);
        let result=await url_shortener_service.shortenUrl(body);
        expect(result.message).to.be.equals("Successfully created the shortened url");
        expect(result.shortened_url).to.be.equals("https://short-url.ly/0000000");
    })
    it("test_UrlShortenerService_success_when_url_is_already_present", async()=>{
        url_db_save_url_stub.resolves(mongo_object_body);
        url_db_fetch_latest_shortened_url_stub.resolves();
        encode_stub.resolves();
        decode_stub.resolves();
        fetch_shortened_url_for_original_url_stub.resolves("0000000");
        validate_url_stub.resolves(true);
        let result=await url_shortener_service.shortenUrl(body);
        expect(result.message).to.be.equals("The shortened url for the given url already exist. Shortened url is https://short-url.ly/0000000");
    })
    it("test_UrlShortenerService_success_when_url_is_not_present_and_consequent_url", async()=>{
        url_db_save_url_stub.resolves(mongo_object_body);
        url_db_fetch_latest_shortened_url_stub.resolves("0000001");
        encode_stub.resolves("0000002");
        decode_stub.resolves("2");
        fetch_shortened_url_for_original_url_stub.resolves();
        validate_url_stub.resolves(true);
        let result=await url_shortener_service.shortenUrl(body);
        expect(result.message).to.be.equals("Successfully created the shortened url");
    })
    it("test_UrlShortenerService_failure when url validation fails", async()=>{
        url_db_save_url_stub.resolves(mongo_object_body);
        url_db_fetch_latest_shortened_url_stub.resolves("0000001");
        encode_stub.resolves("0000002");
        decode_stub.resolves("2");
        fetch_shortened_url_for_original_url_stub.resolves();
        validate_url_stub.resolves(false);
        let res=await url_shortener_service.shortenUrl(body);
        expect(res.code).to.be.equals(422);
    })
    it("test_UrlShortenerService_rejected for some unexpected error", async()=>{
        url_db_save_url_stub.resolves(mongo_object_body);
        url_db_fetch_latest_shortened_url_stub.rejects("0000001");
        encode_stub.resolves("0000002");
        decode_stub.resolves("2");
        fetch_shortened_url_for_original_url_stub.resolves();
        validate_url_stub.resolves(true);
        await expect(url_shortener_service.shortenUrl(body)).to.be.rejectedWith("Unexpected Error");
        // expect(res.code).to.be.equals(422);
    })
})

describe("test_validateUrl_service", ()=>{
    it("test_validateUrl_service_success",async ()=>{
        let res=await url_shortener_service.validateUrl("https://url_shortener.com");
        expect(res).to.be.equals(true);
    })
    it("test_validateUrl_service_success_validation_failure_for_invalid_url",async ()=>{
        let res=await url_shortener_service.validateUrl("ht://url_shortener.com");
        expect(res).to.be.equals(false);
    })
    it("test_validateUrl_service_success_validation_failure_for_empty_url",async ()=>{
        let res=await url_shortener_service.validateUrl();
        expect(res).to.be.equals(false);
    })
})

describe("test_fetchAllUrls_service", ()=>{
    let find_url_stub;
    beforeEach(()=>{
        find_url_stub=sinon.stub(url_db, "findUrl");
    })
    afterEach(()=>{
        find_url_stub.restore();
    })
    it("test_validateUrl_service_success",async ()=>{
        find_url_stub.resolves([
            {original_url: "https://wikipedia.com", url_id: "0000000", createdAt: "2022-12-11T12:05:20.567"}
        ])
        let res=await url_shortener_service.fetchAllUrls();
        expect(res.length).to.be.equals(1);
    })
    
})