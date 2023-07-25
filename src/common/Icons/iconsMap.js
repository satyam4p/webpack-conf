
export default ((props)=>{
    return {
        Settings:(width=20, color= '014421')=>{
            return <img src={'https://img.icons8.com/windows/' + width + '/' + color + '/settings--v1.png'}/>
        },
        Board:(width=20, color='014421')=>{
            return <img src={'https://img.icons8.com/fluency-systems-regular/' + width + '/' + color + '/noticeboard.png'}/>
        },
        RecentTasks:(width=20, color='014421')=>{
            return <img src={'https://img.icons8.com/fluency-systems-regular/' + width + '/' + color + '/task.png'}/>
        },
        Archive:(width=20, color='014421')=>{
            return <img src={'https://img.icons8.com/fluency-systems-regular/' + width + '/' + color + '/archive.png'}/>
        },
        New: (width=25, color='014421')=>{
            return <img src={'https://img.icons8.com/ios/'+ width + '/' + color + '/plus-2-math.png'}/>
        },
        Share: (width=20, color='000000')=>{
            return <img src={'https://img.icons8.com/material-sharp/'+ width + '/' + color + '/share.png'}/>
        },
        Edit: (width=20, color='000000')=>{
            return <img src={'https://img.icons8.com/pastel-glyph/'+ width + '/' + color + '/pencil--v1.png'}/>
        },
        More: (width=25, color='000000')=>{
            return <img src={'https://img.icons8.com/sf-regular/'+ width + '/' + color + '/connection-status-off.png'}/>
        },
        Close: (width=25, color='000000')=>{
            return <img src={'https://img.icons8.com/windows/'+ width + '/' + color + '/macos-close.png'}/>
        },
        Status: (width=22, color='B0AEAE')=>{
            return <img src={'https://img.icons8.com/emoji/'+ width + '/' + color + '/black-circle-emoji.png'}/>
        },
        Timeline: (width=22, color=null)=>{
            return <img src={'https://img.icons8.com/material-outlined/'+ width + '/' + color + '/vertical-timeline.png'}/>
        },
        Assignee: (width=22, color=null)=>{
            return <img src={'https://img.icons8.com/ios-glyphs/'+ width + '/' + color + '/batch-assign.png'}/>
        },
        Label: (width=22, color=null)=>{
            return <img src={'https://img.icons8.com/ios/'+ width + '/' + color + '/tags--v1.png'}/>
        },

    }
})();