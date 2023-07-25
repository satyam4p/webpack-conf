import { SaveOutlined,
    ShareAltOutlined,
    EditOutlined,
    CloseCircleOutlined,
    MoreOutlined,
    FieldTimeOutlined,
    UserAddOutlined,
    TagsOutlined,
    AlertOutlined,
    LoadingOutlined,
    FileAddOutlined,
    DeleteOutlined,
    UserOutlined,
    SendOutlined,
    ClearOutlined,
    DoubleRightOutlined,
    SearchOutlined,
    CarryOutOutlined,
    FundOutlined,
    FileZipOutlined,
    SettingOutlined,
    PlusSquareOutlined,
    BgColorsOutlined,
    FilterOutlined,
    FullscreenOutlined,
    ExpandOutlined


} from '@ant-design/icons';

const iconsMap = (()=>{
    return {
        save: ( size = 20, weight = 800 )=>{
            return <SaveOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></SaveOutlined>
        },
        share: (size = 20, weight = 800)=>{
            return <ShareAltOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></ShareAltOutlined>
        },
        edit: ( editEnabled = false, size = 20, weight = 800 )=>{
            const newStyle = editEnabled ? { fontSize:`${size}px`, fontWeight:`${weight}`, color: '#6B8B65'} : {fontSize:`${size}px`, fontWeight:`${weight}`}; 
            return <EditOutlined style={newStyle}></EditOutlined>
        },
        close: (size = 20, weight = 800)=>{
            return <CloseCircleOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></CloseCircleOutlined>
        },
        more: (size = 20, weight = 800, active = false)=>{
            return <MoreOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}} rotate={active ? 90 : 0}></MoreOutlined>
        },
        time: (size = 20, weight = 800)=>{
            return <FieldTimeOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></FieldTimeOutlined>
        },
        user: (size = 20, weight = 800)=>{
            return <UserAddOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></UserAddOutlined>
        },
        tag: (size = 20, weight = 800)=>{
            return <TagsOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></TagsOutlined>
        },
        alert : (size = 20, weight = 800)=>{
            return <AlertOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></AlertOutlined>
        },
        loading: (size = 20, weight = 800)=>{
            return <LoadingOutlined spin style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></LoadingOutlined>
        },
        create: (size = 20, weight = 800)=>{
            return <FileAddOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></FileAddOutlined>
        },
        delete: (size = 20, weight = 800)=>{
            return <DeleteOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></DeleteOutlined>
        },
        profile: (size = 20, weight = 800)=>{
            return <UserOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></UserOutlined>
        },
        send: ( size = 20, weight = 800 )=>{

            return <SendOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></SendOutlined>
        },
        editNormal: (size = 20, weight = 800)=>{
            return <EditOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></EditOutlined>
        },
        clear: (size = 20, weight = 800)=>{
            return <ClearOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></ClearOutlined>
        },
        doubleRightArror: (size = 20, weight = 800)=>{
            return <DoubleRightOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`, alignSelf:'end'}}></DoubleRightOutlined>
        },
        search: (size = 20, weight = 800)=>{
            return <SearchOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></SearchOutlined>
        },
        recentTasks: (size = 14, weight = 800)=>{
            return <CarryOutOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></CarryOutOutlined>
        },
        board: (size = 14, weight = 800)=>{
            return <FundOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></FundOutlined>
        },
        archive: (size = 14, weight = 800)=>{
            return <FileZipOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></FileZipOutlined>
        },
        settings: (size = 14, weight = 800)=>{
            return <SettingOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></SettingOutlined>
        },
        add: (size = 14, weight = 800)=>{
            return <PlusSquareOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></PlusSquareOutlined>
        },
        theme: (size = 14, weight = 800)=>{
            return <BgColorsOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></BgColorsOutlined>
        },
        filter:(size= 14, weight = 800)=>{
            return <FilterOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></FilterOutlined>
        },
        open:(size= 14, weight = 800)=>{
            return <FullscreenOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></FullscreenOutlined>
        },
        expand:(size= 14, weight = 800)=>{
            return <ExpandOutlined style={{fontSize:`${size}px`, fontWeight:`${weight}`}}></ExpandOutlined>
        }
    }
})();

export default iconsMap;