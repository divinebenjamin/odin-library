myLibrary = [];


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
  myLibrary.unshift(book);
}

// ----- Render -----s
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


// ----- Read toggle prootype -----
Book.prototype.toggleRead = function() {
  this.read = !this.read;
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
    book.toggleRead()
    render();
  }
});       


// ----- Add Book -----
const addDialog = document.getElementById('add-dialog');
const addForm = document.getElementById('add-form');
const readToggle = document.getElementById('f-read');
let readState = false

function setReadToggle(v) {
  readState = v;
  readToggle.setAttribute('aria-checked', String(v));
  readToggle.style.background = v ? 'hsl(245 85% 60%)' : 'hsl(245, 20%, 82%)';
  readToggle.querySelector('.thumb').style.transform = v ? 'translateX(18px)' : 'translateX(2px)';
}
readToggle.addEventListener('click', () => setReadToggle(!readState));

function openAdd() {
  addForm.reset();
  setReadToggle(false);
  addDialog.classList.remove('hidden');
  addDialog.classList.add('flex');
  setTimeout(() => document.getElementById('f-title').focus(), 50);
}

function closeAdd() {
  addDialog.classList.add('hidden');
  addDialog.classList.remove('flex');
}
document.getElementById('open-add').addEventListener('click', openAdd);
document.getElementById('cancel-add').addEventListener('click', closeAdd);
addDialog.addEventListener('click', (e) => { if (e.target === addDialog) closeAdd(); });

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('f-title').value.trim();
  const author = document.getElementById('f-author').value.trim();
  const pages = parseInt(document.getElementById('f-pages').value, 10) || 0;
  if (!title || !author) return;
  addBookToLibrary(title, author, pages, readState)
  render(); closeAdd();
});

render();
