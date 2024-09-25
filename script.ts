// listing element
document.getElementById('resumeform')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Type assertion
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLSelectElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;

    ////////////////////////////////// resume url/////////////////////////////////////////

   const usernameElement = document.getElementById('username') as HTMLInputElement;
       

   /////////////////////////////////////  Condition /////////////////////////////////
    if (profilePictureInput && nameElement && emailElement && addressElement && phoneElement && educationElement && experienceElement && skillsElement) {
    
    usernameElement
    /////////////////////////////// Function to update the resume ///////////////////////////////
        function updateResume() {
            const name = nameElement.value;
            const email = emailElement.value; 
            const phone = phoneElement.value;
            const address = addressElement.value;
            const education = educationElement.value;
            const experience = experienceElement.value;
            const skills = skillsElement.value;  

    ///// url ///////////
    const username = usernameElement.value;
    const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html` 
  
    ///////////////////////////////////  Picture element //////////////////////////////////////////
            const profilePictureFile = profilePictureInput.files?.[0];
            const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
  
    //////////////////////////// Resume output //////////////////////////////////////////
            const resumeOutput = `
                ${profilePictureURL ? `<img src="${profilePictureURL}" alt="profile picture" class="profilePicture">` : ""}
                <p><strong>Name:</strong> <span class="editable" id="edit-name">${name}</span></p>
                <p><strong>Email:</strong> <span class="editable" id="edit-email">${email}</span></p>
                <p><strong>Phone:</strong> <span class="editable" id="edit-phone">${phone}</span></p>
                <p><strong>Address:</strong> <span class="editable" id="edit-address">${address}</span></p>
  
                <h3>Education:</h3>
                <p class="editable" id="edit-education">${education}</p>
  
                <h3>Experience:</h3>
                <p class="editable" id="edit-experience">${experience}</p>
  
                <h3>Skills:</h3>
                <p class="editable" id="edit-skills">${skills}</p>
            `;
    ///////////////////////// url /////////////////////////////////
    const downloadLink = document.createElement('a');
    downloadLink.id = 'link';
    downloadLink.style.border = 'none';
    downloadLink.style.width = '500px';
    downloadLink.style.padding = '10px';
    downloadLink.style.backgroundColor = '#6efda5';
    downloadLink.style.borderRadius = '5px';
    downloadLink.style.cursor = 'pointer';
    downloadLink.style.fontSize = '20px';
    downloadLink.style.textDecoration = 'none';
    downloadLink.style.color = '#222222';


    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput)
    downloadLink.download = uniquePath;
    downloadLink.textContent = 'Download your resume';

    

    /////////////////////////////////// Display output ////////////////////////////////////////////
    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput + '<br>  <br>';
        resumeOutputElement.classList.remove('hidden');


/////////////////////////////////// create container for button //////////////////////////////////

const buttonContainer = document.createElement('div');
buttonContainer.id = 'buttoncontainer';
buttonContainer.style.width = '880px';
buttonContainer.style.gap = '4px';
resumeOutputElement.appendChild(buttonContainer);


///////////////////////////// downlad pdf ////////////////////////////////////////////////

const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download as PDF';
downloadButton.addEventListener('click', () => {
window.print(); // open alert msg for pdf download
});

buttonContainer.appendChild(downloadButton);

// Add a line break after the first button
buttonContainer.appendChild(document.createElement('br'));

////////////////////// add shareable link //////////////////////////////////////////////

const shareLinkButton = document.createElement('button');
shareLinkButton.textContent = "Copy Shareable Link";
shareLinkButton.addEventListener('click', () => {
try{
    // create a unique shareable link //
    const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, "_")}_cv.html`;

    // clipboard API to copy the shareableLink
     navigator.clipboard.writeText(shareableLink);
    alert('ShareableLink Copied to Clipboard!');

}

catch(err) {
    console.error('Failed to Copy Link: ', err);
    alert('Failed to copy link to clipboard. Please try again');
    
}
});

buttonContainer.appendChild(shareLinkButton);
                

/*url*/resumeOutputElement.appendChild(downloadLink)

      resumeOutputElement.style.display = 'block';
            }
        }
  
    //////////////////////////////  Event listeners without reloading ///////////////////////////////////////
        nameElement.addEventListener('input', updateResume);
        emailElement.addEventListener('input', updateResume);
        addressElement.addEventListener('input', updateResume);
        phoneElement.addEventListener('input', updateResume);
        educationElement.addEventListener('change', updateResume);
        experienceElement.addEventListener('input', updateResume);
        skillsElement.addEventListener('input', updateResume);
        profilePictureInput.addEventListener('change', updateResume);
  
    ////////////////////// Initial call to update resume ///////////////////////////////////////////
        updateResume();
    }
  });
  
  function makeEditable() {
    const editableElements = document.querySelectorAll(".editable");
    editableElements.forEach((element) => {
        element.addEventListener("click", function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";
  
            // Replace content
            const input = document.createElement("input");
            input.type = "text";
            input.value = currentValue;
            input.classList.add("editing-input");
  
            input.addEventListener("blur", function () {
                currentElement.textContent = input.value;
                currentElement.style.display = "inline";
                input.remove();
            });
  
            currentElement.style.display = "none";
            currentElement.parentNode?.insertBefore(input, currentElement);
            input.focus();
        });
    });
  }
  makeEditable();