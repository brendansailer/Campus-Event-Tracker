export const createAnnouncement = (newAnnouncement) => {
    return fetch('/club/announcement/create', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(
        {
          club_id: newAnnouncement.club_id, 
          announcement_text: newAnnouncement.announcement_text,
          created_at: newAnnouncement.created_at, 
          expires_at: newAnnouncement.expires_at,
        })
    }).then(response => response.json())
  }