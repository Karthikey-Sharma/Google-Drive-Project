(function() {
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");
    let fid = -1;
    let folders = [];

    btnAddFolder.addEventListener("click", addFolder);

    function addFolder() {
        let fname = prompt("Enter Folder Name")
        if (!!fname) {

            let fidx = folders.findIndex(f => fname == f.name);
            if (fidx == -1) {
                fid++;
                //Teen jagah storage pe add krna hai is new Folder ko
                // RAM
                folders.push({
                    name: fname,
                    id: fid
                })

                // Local Storage 
                saveToStorage()

                // html
                addFolderHTML(fname, fid)

            } else {
                alert(fname + " already exists!!!!")
            }


        } else {
            alert("Please Enter Something!");
        }

    }

    function editFolder() {

        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose = 'name']");
        let oldName = divName.innerHTML;
        let newfname = prompt("Please enter new name for " + oldName);
        if (!!newfname) {
            if (newfname != oldName) {
                let exists = folders.some(f => f.name == newfname); // trying to check if there exists any other folder by the new name we want to edit the folder
                if (exists == false) {
                    // change ayega in 

                    //RAM
                    let folder = folders.find(f => f.name == oldName);
                    folder.name = newfname;

                    // HTML
                    divName.innerHTML = newfname;

                    // Storage
                    saveToStorage();
                } else {
                    alert(nfname + " already exists!")
                }
            } else {
                alert("This is old name only. Please enter something new.")
            }

        } else {
            alert("Please Enter Something")
        }

    }

    function deleteFolder() {

        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']")
        let flag = confirm("Are you sure you want to delete " + divName.innerHTML + " ?")
        if (flag == true) {
            // teen memories se delete krna hoga
            //RAM
            let fidx = folders.findIndex(f => f.name == divName.innerHTML)
            folders.splice(fidx, 1);

            // html
            divContainer.removeChild(divFolder);
            //storage
            saveToStorage()
        }



    }

    function addFolderHTML(fname, fid) {
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let spanEdit = divFolder.querySelector("[action = 'edit']");

        let spanDelete = divFolder.querySelector("[action = 'delete']")

        let divName = divFolder.querySelector("[purpose = 'name']");
        divFolder.setAttribute("fid", fid);
        divName.innerHTML = fname;

        spanEdit.addEventListener("click", editFolder);
        spanDelete.addEventListener("click", deleteFolder);

        divContainer.appendChild(divFolder);


    }

    function saveToStorage() {

        let fjson = JSON.stringify(folders)
        localStorage.setItem("data", fjson);

    }

    function loadFoldersFromStorage(fname, fid) {

        let fjson = localStorage.getItem("data");
        if (!!fjson) {
            folders = JSON.parse(fjson)

            folders.forEach(f => {
                if (f.id > fid) {
                    fid = f.id;
                }
                addFolderHTML(f.name, f.id)
            })
        }

    }

    loadFoldersFromStorage()
})();