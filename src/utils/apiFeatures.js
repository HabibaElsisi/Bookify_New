export class ApiFeature{
    constructor(mongooseQuery,searchQuery){ 
        this.mongooseQuery=mongooseQuery
        this.searchQuery=searchQuery

    }
    pagination(){
        let pageLimit=10
        if(this.searchQuery.limit){
            pageLimit=this.searchQuery.limit
        }
        if( this.searchQuery.page<=0)  this.searchQuery.page=1
        let pageNumber =  this.searchQuery.page*1||1
        
        let skip=(pageNumber-1)*pageLimit
        this.pageNumber=pageNumber
        this.mongooseQuery.skip(skip).limit(pageLimit)
        return this
    }
    filter(){
        let filterObj={...this.searchQuery}

    let excludedFields=["page","sort","fields","keyword","limit"]
    excludedFields.forEach((val)=>{
        delete filterObj[val]
   })

    console.log(filterObj);
    filterObj=JSON.stringify(filterObj)
    filterObj=filterObj.replace(/(gte|gt|lte|lt)/g,match=>"$"+match)
    filterObj=JSON.parse(filterObj)
    this.mongooseQuery.find(filterObj)
    return this
    }
    sort(){
        if(this.searchQuery.sort){
            let sortBy= this.searchQuery.sort.split(',').join(' ')
            console.log(sortBy);
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }
    fields(){
        if(this.searchQuery.fields){
            let fields= this.searchQuery.fields.split(',').join(' ')
            console.log(fields);
            this.mongooseQuery.select(fields)
        }
        return this
    }
    search() {
        if (this.searchQuery.keyword) {
            const keyword = this.searchQuery.keyword;
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                    { name: { $regex: keyword, $options: 'i' } },
                    { slug: { $regex: keyword, $options: 'i' } }
                ]
            });
        }
        return this;
    }
    
}