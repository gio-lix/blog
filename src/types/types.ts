export interface ThemeType {
	colour: string,
	isGradient: boolean
}

export interface NoteType {
	id: string,
	title: string,
	text: string,
	images: string[],
	theme: ThemeType,
	font: string,
	isFavourite: boolean
}
export interface InitialState {
	savedNotes: NoteType[],
	trashedNotes: NoteType[],
	isNoteEmpty: boolean,
	isNoteNew: boolean,
	isNoteDialogVisible: boolean,
	noteId: string,
	noteTitle: string,
	noteText: string,
	noteImages: string[],
	noteTheme: ThemeType,
	noteFont: string,
	noteIsFavourite: boolean
}

export interface ElementsVisible {
	fontSelect: boolean,
	themePalette: boolean
}


