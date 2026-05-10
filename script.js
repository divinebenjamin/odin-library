myLibrary = [
  { id: '1', title: 'The Architecture of Silence', author: 'Elias Vance', pages: 312, read: true },
  { id: '2', title: 'Notes on a Waning Season', author: 'Clara Hemlock', pages: 184, read: false },
  { id: '3', title: "A Dictionary of Forgotten Winds", author: 'Julian Thorne', pages: 450, read: false },
  { id: '4', title: "The Cartographer's Daughter", author: 'Mira Solenne', pages: 278, read: true },
  { id: '5', title: 'Letters to a Distant Lighthouse', author: 'Owen Marchetti', pages: 196, read: true },
  { id: '6', title: 'Of Quiet Rooms and Loud Hearts', author: 'Sasha Wren', pages: 224, read: false },
];


function Book(title, author, pages, read = false) {
  if (!new.target) {
    throw Error("Use the 'new' operator to call a constructor");
  }

  this.id = crypto.randomUUID();  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// ----- Render -----
const statsTotal = document.getElementById('stats-total');
const statsRead = document.getElementById('stats-read');
const empty = document.getElementById('empty-state');
const grid = document.getElementById('book-grid');
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function render() {
  statsTotal.textContent = myLibrary.length;
  statsRead.textContent = myLibrary.filter(book => book.read).length;

  if (myLibrary.length === 0) {
    grid.classList.add('hidden');
    empty.classList.remove('hidden');
    empty.classList.add('flex');
    return;
  }

  grid.classList.remove('hidden');
  empty.classList.remove('flex');
  empty.classList.add('hidden');

  grid.innerHTML = myLibrary.map(book => `
    <article 
      data-id="${book.id}"
      class="group flex flex-col gap-5 animate-fade-in-up">
      <div class="flex flex-col gap-1.5">
        <div class="flex justify-between items-start gap-4">
          <h2 class="text-2xl md:text-[1.6rem] leading-tight">${escapeHtml(book.title)}</h2>
          <button data-action="delete" aria-label="Remove ${escapeHtml(book.title)}"
            class="text-xl text-muted hover:text-primary transition-colors shrink-0 -mr-1 p-1 rounded-sm">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <p class="text-muted">${escapeHtml(book.author)}</p>
      </div>

      <div class="flex items-center justify-between mt-auto pt-4 border-t border-border/80">
        <button data-action="toggle" class="${book.read
          ? 'text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-sm bg-primary text-primary-foreground hover:bg-foreground transition-colors'
          : 'text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-sm border border-border text-muted hover:border-primary hover:text-primary transition-colors'}">
          ${book.read ? 'Read' : 'Unread'}
        </button> 
        
        <span class="test-xs text-muted tabular-nums">${book.pages} pp.</span>
      </div>

    </article>
  `).join('');
}


// ----- Events: grid (delegated) -----
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const card = e.target.closest('article[data-id]');
  const id = card?.dataset.id;
  const book = myLibrary.find(book => book.id === id);
  if (!book) return;

  const action = btn.dataset.action;
  if (action === 'delete') {
    myLibrary = myLibrary.filter(book => book.id !== id);
    render();
  } else if (action === 'toggle') {
    book.read = !book.read;
    render();
  }
});       


// ----- Add Book -----



render();
