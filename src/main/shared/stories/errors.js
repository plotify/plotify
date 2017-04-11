// Open:

export class AnotherStoryAlreadyOpenedError extends Error {
  constructor() {
    super("Another story has already been opened.");
    this.name = "AnotherStoryAlreadyOpenedError";
  }
}

export class UnsupportedFileVersionError extends Error {

  constructor(maxSupportedFileVersion, unsupportedFileVersion) {
    super("Unsupported story version.");
    this.name = "UnsupportedFileVersionError";
    this.maxSupportedFileVersion = maxSupportedFileVersion;
    this.unsupportedFileVersion = unsupportedFileVersion;
  }

}

export class NoStoryChosenError extends Error {

  constructor() {
    super("No story chosen by user.");
    this.name = "NoStoryChosenError";
  }

}

// Close:

export class CouldNotCloseStoryError extends Error {
  constructor(message) {
    super(message);
    this.name = "CouldNotCloseStoryError";
  }
}
