const sideBar = document.querySelector('#sideBar');
const menuBreadCrump = document.querySelector('#breadCrumb');
const menuElements = createMenuObject();
const activeQualifier = 'is-active';
// setActiveSelection();
// updateBreadCrump();

//Set is-active class to show which Element is currently selected
sideBar.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'A') {
        //Browse through all main menu Entrys
        for(mainMenuEntry in menuElements){
            menuElements[mainMenuEntry].htmlElement.classList.remove(activeQualifier)
            if (target === menuElements[mainMenuEntry].htmlElement){
                target.classList.add(activeQualifier);
            }
            else if (target !== menuElements[mainMenuEntry].htmlElement && menuElements[mainMenuEntry].subMenu){
                for(subMenuEntry in menuElements[mainMenuEntry].subMenu){
                    if(target === menuElements[mainMenuEntry].subMenu[subMenuEntry].htmlElement){
                        menuElements[mainMenuEntry].htmlElement.classList.add(activeQualifier)
                    }
                }
            }
        }
        // setActiveSelection(e);
        // updateBreadCrump();
    }

}, false)


/**HELPER FUNCTIOND */
function createMenuObject() {
    const menuObject = {};
    [].map.call(sideBar.querySelectorAll('a'), (curElement, index) => {
        if (curElement.parentElement.parentElement.classList.value.includes('menu-list'))
            menuObject[index] = { menuText: curElement.text, htmlElement: curElement };
    })
    //Creating submenu
    for (index in menuObject) {
        const children = menuObject[index].htmlElement.parentElement.children;
        if (children.length > 1) {
            [].map.call(children, (htmlElement) => {
                if (htmlElement.tagName === 'UL') {
                    menuObject[index].subMenu = {};
                    [].map.call(htmlElement.querySelectorAll('a'), (listElement, indexList) => {
                        menuObject[index].subMenu[indexList] = { menuText: listElement.text, htmlElement: listElement };
                    });
                }

            })
        }
    }
    return menuObject;
};

// function setActiveSelection(event) {
//     if(!event){
//         menuElements[0].menuElement.classList.add(activeQualifier);
//     }
//     if (event) {
//         const clickTarget = event.target;

//         //Go through all main menu elements to reorganize the selection
//         for (menuEntry in menuElements) {

//             //First: remove class from all elements to have a blank menu
//             menuElements[menuEntry].menuElement.classList.remove(activeQualifier);

//             //Second: setting the class to make the clicked element active 
//             if (clickTarget === menuElements[menuEntry].menuElement)
//                 menuElements[menuEntry].menuElement.classList.add(activeQualifier);
//             if (clickTarget === menuElements[menuEntry].menuElement.submenuList)
//                 console.log(true)
//         }
//     }
// }

// function updateBreadCrump() {
//     for (menuEntry in menuElements) {
//         if (menuElements[menuEntry].menuElement.classList.value.includes(activeQualifier)) {
//             const breadCrumpList = menuBreadCrump.querySelector('ul');
//             const listEntry = document.createElement("li");
//             const aTag = document.createElement("a");

//             breadCrumpList.innerHTML = "";
//             aTag.innerText = menuElements[menuEntry].menuText;
//             listEntry.appendChild(aTag);
//             breadCrumpList.appendChild(listEntry);
//         }
//     }
// }


