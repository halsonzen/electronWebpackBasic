const sideBar = document.querySelector('#sideBar');
const menuBreadCrump = document.querySelector('#breadCrumb');
const menuElements = createMenuObject();
const activeQualifier = 'is-active';
const activeQualifierSub = 'is-active-sub';


setActiveQualifiers();
updateBreadCrump();

//Set is-active class to show which Element is currently selected
sideBar.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'A') {
        removeActiveQualifiers();
        setActiveQualifiers(e);
        updateBreadCrump();
    }
}, false)

/**HELPER FUNCTIOND */
function removeActiveQualifiers() {
    const activeElement = sideBar.querySelector('.' + activeQualifier);
    const activeSubElement = sideBar.querySelector('.' + activeQualifierSub);
    if (activeElement)
        activeElement.classList.remove(activeQualifier);
    if (activeSubElement)
        activeSubElement.classList.remove(activeQualifierSub);
}
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
function setActiveQualifiers(event) {

    if (!event) {
        menuElements[0].htmlElement.classList.add(activeQualifier);
    }
    if (event) {
        const target = event.target;
        //Browse through all main menu Entrys
        for (index in menuElements) {
            if (target === menuElements[index].htmlElement) {
                target.classList.add(activeQualifier);
            }
            else if (target !== menuElements[index].htmlElement && menuElements[index].subMenu) {
                for (subMenuEntry in menuElements[index].subMenu) {
                    if (target === menuElements[index].subMenu[subMenuEntry].htmlElement) {
                        menuElements[index].htmlElement.classList.add(activeQualifier);
                        menuElements[index].subMenu[subMenuEntry].htmlElement.classList.add(activeQualifierSub);
                    }
                }
            }

        }
    }
}
function updateBreadCrump() {
    const activeElement = sideBar.querySelector('.' + activeQualifier);
    const activeSubElement = sideBar.querySelector('.' + activeQualifierSub);
    const breadCrumpList = menuBreadCrump.querySelector('ul');
    const listEntry = document.createElement("li");
    const aTag = document.createElement("a");

    breadCrumpList.innerHTML = "";
    aTag.innerText = activeElement.innerHTML;
    listEntry.appendChild(aTag);

    ///Add submenuElement to breadcrump menu
    console.log(activeSubElement)
    //aTag.innerText = activeSubElement.innerHTML;
    listEntry.appendChild(aTag);
    breadCrumpList.appendChild(listEntry);
}


