const candidates = {};

function showMessage(message, color = "#27ae60", targetId = "voteMessage") {
    const messageElement = document.getElementById(targetId);
    messageElement.textContent = message;
    messageElement.style.color = color;
    messageElement.style.opacity = 1;
    messageElement.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
        messageElement.style.opacity = 0;
    }, 3000);
}

function addCandidate() {
    const candidateNameInput = document.getElementById('candidateName');
    const candidateIdInput = document.getElementById('candidateId');

    const name = candidateNameInput.value.trim();
    const id = candidateIdInput.value.trim();

    if (name && id) {
        if (candidates[id]) {
            showMessage(`Candidate with ID ${id} already exists.`, "red", "voteMessage");
            return;
        }
        candidates[id] = { name: name, votes: 0 };
        showMessage(`Candidate "${name}" with ID "${id}" added.`, "#2ecc71", "voteMessage");
        candidateNameInput.value = '';
        candidateIdInput.value = '';
    } else {
        showMessage("Please enter both candidate name and ID.", "red", "voteMessage");
    }
}

function showCandidates() {
    const candidatesListElement = document.getElementById('candidatesList');
    candidatesListElement.innerHTML = '';

    if (Object.keys(candidates).length === 0) {
        candidatesListElement.innerHTML = '<li>No candidates added yet.</li>';
        return;
    }

    for (const id in candidates) {
        const candidate = candidates[id];
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${id}, Name: ${candidate.name}, Votes: ${candidate.votes}`;
        candidatesListElement.appendChild(listItem);
    }
}

function vote() {
    const voteIdInput = document.getElementById('voteId');
    const voteId = voteIdInput.value.trim();

    if (candidates[voteId]) {
        candidates[voteId].votes++;
        showMessage(`Vote cast for candidate with ID "${voteId}".`, "#2980b9");
        voteIdInput.value = '';
    } else {
        showMessage(`Candidate with ID "${voteId}" not found.`, "red");
    }
}

function getCandidateDetails() {
    const getCandidateIdInput = document.getElementById('getCandidateId');
    const candidateDetailsElement = document.getElementById('candidateDetails');
    const candidateId = getCandidateIdInput.value.trim();

    if (candidates[candidateId]) {
        const candidate = candidates[candidateId];
        candidateDetailsElement.innerHTML = `
            <p><strong>ID:</strong> ${candidateId}</p>
            <p><strong>Name:</strong> ${candidate.name}</p>
            <p><strong>Votes:</strong> ${candidate.votes}</p>
        `;
        getCandidateIdInput.value = '';
    } else {
        candidateDetailsElement.textContent = `Candidate with ID "${candidateId}" not found.`;
        candidateDetailsElement.style.color = "red";
    }
}
