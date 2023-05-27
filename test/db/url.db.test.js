let url_db=require("../../db/url.db");
let chai=require("chai");
let sinon=require("sinon");
let urlModel=require("../../models/url.model");
let {expect} =require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("test_findUrl_db", ()=>{
    let findStub;
    beforeEach(()=>{
        findStub=sinon.stub(urlModel, "find");
    });
    afterEach(()=>{
        findStub.restore();
    })
    it("test_findUrl_db_success_when_short_url is given", async()=>{
        findStub.returns([{original_url: "http://localhost.com", url_id: "0000000"},
                            {original_url: "http://localhost1.com", url_id: "0000001"}])
        let res=await url_db.findUrl("https://shortened_url/0000000");
        expect(res.length).to.be.equals(2);
    })
    it("test_findUrl_db_success_when_short_url is not given", async()=>{
        findStub.returns([{original_url: "http://localhost.com", url_id: "0000000"},
                            {original_url: "http://localhost1.com", url_id: "0000001"}])
        let res=await url_db.findUrl();
        expect(res.length).to.be.equals(2);
    })
})

describe("test_fetchShortenedUrlForOriginalUrl_db", ()=>{
    let findOneStub;
    beforeEach(()=>{
        findOneStub=sinon.stub(urlModel, "findOne");
    });
    afterEach(()=>{
        findOneStub.restore();
    })
    it("test_fetchShortenedUrlForOriginalUrl_db_success_when_short_url is given", async()=>{
        findOneStub.returns({original_url: "http://localhost1.com", url_id: "0000001"})
        let res=await url_db.fetchShortenedUrlForOriginalUrl("https://shortened_url/0000000");
        expect(res).to.be.equals("0000001")
    })
    it("test_fetchShortenedUrlForOriginalUrl_db_success_when_no entry is present", async()=>{
        findOneStub.returns()
        let res=await url_db.fetchShortenedUrlForOriginalUrl("https://shortened_url/0000000");
        expect(res).to.be.undefined;
    })
})

describe("test_fetchLatestShortenedUrl_db", ()=>{
    let findStub;
    beforeEach(()=>{
        findStub=sinon.stub(urlModel, "find");
    });
    afterEach(()=>{
        findStub.restore();
    })
    it("test_fetchLatestShortenedUrl_db_success_when_short_url is given", async()=>{
        findStub.returns({
            exec(){return [{original_url: "http://localhost1.com", url_id: "0000001"}]},
            sort(){return this}
        })
        let res=await url_db.fetchLatestShortenedUrl();
        expect(res).to.be.equals("0000001")
    })
    it("test_fetchLatestShortenedUrl_db_response when empty doc is returned", async()=>{
        findStub.returns({
            exec(){return []},
            sort(){return this}
        })
        let res=await url_db.fetchLatestShortenedUrl();
        expect(res).to.be.undefined
    })
    it("test_fetchLatestShortenedUrl_db_rejected when some error connecting to mongo", async()=>{
        findStub.throws("Mongo Error")
        await expect(url_db.fetchLatestShortenedUrl()).to.be.rejectedWith("Unexpected Error");
    })
})

describe("test_saveUrl_db", ()=>{
    let saveStub;
    beforeEach(()=>{

        saveStub=sinon.stub(urlModel.prototype, "save");
    });
    afterEach(()=>{
        saveStub.restore();
    })
    it("test_saveUrl_db_success_when_short_url is given", async()=>{
        saveStub.returns({original_url: "http://localhost1.com", url_id: "0000001"})
        let res=await url_db.saveUrl("https://shortened_url/0000000");
        expect(res.original_url).to.be.equals("http://localhost1.com");
        expect(res.url_id).to.be.equals("0000001");
    })
    
})