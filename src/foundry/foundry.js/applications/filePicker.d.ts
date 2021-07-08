/**
 * The FilePicker application renders contents of the server-side public directory
 * This app allows for navigating and uploading files to the public path
 * @typeParam P - the type of the options object
 */
declare class FilePicker<P extends FilePicker.Options = FilePicker.Options> extends Application<P> {
  /**
   * The full requested path given by the user
   */
  request: string | null;

  /**
   * The file sources which are available for browsing
   */
  sources: Partial<FilePicker.Sources>;

  /**
   * Track the active source tab which is being browsed
   * @defaultValue `'data'`
   */
  activeSource: string;

  /**
   * The latest set of results browsed from the server
   * @remarks This is never set.
   */
  results: {};

  /**
   * The general file type which controls the set of extensions which will be accepted
   */
  type: string;

  /**
   * The target HTML element this file picker is bound to
   */
  field: HTMLElement | null;

  /**
   * A button which controls the display of the picker UI
   */
  button: HTMLElement | null;

  /**
   * The display mode of the FilePicker UI
   */
  displayMode: FilePicker.DisplayMode;

  /**
   * The current set of file extensions which are being filtered upon
   */
  extensions: string[];

  protected _loaded: boolean;

  /**
   * @override
   */
  static get defaultOptions(): FilePicker.Options;

  /**
   * Given a current file path, determine the directory it belongs to
   * @param target - The currently requested target path
   * @returns An array of the inferred source and target directory path
   */
  protected _inferCurrentDirectory(target: string): [string, string];

  /**
   * Get the valid file extensions for a given named file picker type
   */
  protected _getExtensions(type: string): string[] | undefined;

  /**
   * Test a URL to see if it matches a well known s3 key pattern
   * @param url - An input URL to test
   * @returns A regular expression match
   */
  static matchS3URL(url: string): RegExpMatchArray | null;

  /**
   * Parse a s3 key to learn the bucket and the key prefix used for the request
   * @param key - A fully qualified key name or prefix path
   */
  static parseS3URL(key: string): { bucket: string | null; keyPrefix: string };

  /**
   * @override
   */
  get title(): string;

  /**
   * Return the source object for the currently active source
   */
  get source(): FilePicker.Source;

  /**
   * Return the target directory for the currently active source
   */
  get target(): string;

  /**
   * Return a flag for whether the current user is able to upload file content
   */
  get canUpload(): boolean;

  /**
   * Return the upload URL to which the FilePicker should post uploaded files
   */
  static get uploadURL(): string;

  /**
   * @param options - (unused)
   * @override
   */
  getData(options?: Application.RenderOptions): Promise<FilePicker.Data>;

  /**
   * Browse to a specific location for this FilePicker instance
   * @param target - The target within the currently active source location.
   * @param options - Browsing options
   */
  browse(target?: string, options?: Partial<FilePicker.BrowsingOptions>): Promise<FilePicker.Result>;

  /**
   * Browse files for a certain directory location
   * @param source  - The source location in which to browse. See FilePicker#sources for details
   * @param target  - The target within the source location
   * @param options - Optional arguments
   *
   * @returns A Promise which resolves to the directories and files contained in the location
   */
  static browse(
    source: string,
    target: string,
    options?: Partial<FilePicker.BrowsingOptions>
  ): Promise<FilePicker.Result & { dirs?: string[] }>;

  /**
   * Configure metadata settings regarding a certain file system path
   * @param source  - The source location in which to browse. See FilePicker#sources for details
   * @param target  - The target within the source location
   * @param options - Optional arguments which modify the request
   */
  static configurePath(source: string, target: string, options?: Record<string, unknown>): Promise<unknown>;

  /**
   * Create a subdirectory within a given source. The requested subdirectory path must not already exist.
   * @param source  - The source location in which to browse. See FilePicker#sources for details
   * @param target  - The target within the source location
   * @param options - Optional arguments which modify the request
   */
  static createDirectory(source: string, target: string, options?: Record<string, unknown>): Promise<unknown>;

  /**
   * General dispatcher method to submit file management commands to the server
   */
  protected static _manageFiles(data: FilePicker.ManageData, options?: Record<string, unknown>): Promise<unknown>;

  /**
   * Dispatch a POST request to the server containing a directory path and a file to upload
   * @param source  - The data source to which the file should be uploaded
   * @param path    - The destination path
   * @param file    - The File object to upload
   * @param options - Additional file upload options passed as form data
   * @returns The response object
   */
  static upload(
    source: string,
    path: string,
    file: File,
    options?: Record<string, any>
  ): Promise<(Response & { path: string; message?: string }) | false | void>;

  /**
   * Additional actions performed when the file-picker UI is rendered
   */
  render(force?: boolean, options?: Application.RenderOptions): this | void | Promise<FilePicker.Result>;

  /**
   * Activate listeners to handle user interactivity for the FilePicker UI
   */
  activateListeners(html: JQuery): void;

  /**
   * Handle a click event to change the display mode of the File Picker
   * @param event - The triggering click event
   */
  protected _onChangeDisplayMode(event: JQuery.ClickEvent): void;

  /**
   * @param event - (unused)
   * @param event - (unused)
   * @override
   */
  protected _onChangeTab(event: MouseEvent | null, tabs: Tabs, active: this['activeSource']): void;

  /**
   * @param selector - (unused)
   * @override
   */
  protected _canDragStart(selector: string | null): boolean;

  /**
   * @param selector - (unused)
   * @override
   */
  protected _canDragDrop(selector: string | null): this['canUpload'];

  /**
   * @override
   */
  protected _onDragStart(event: DragEvent): void;

  /**
   * @override
   */
  protected _onDrop(event: DragEvent): Promise<FilePicker.Result | void>;

  /**
   * Handle user submission of the address bar to request an explicit target
   * @param event - The originating keydown event
   */
  protected _onRequestTarget(event: KeyboardEvent): void;

  /**
   * Handle requests from the IntersectionObserver to lazily load an image file
   */
  protected _onLazyLoadImages(...args: any): void;

  /**
   * Handle file or folder selection within the file picker
   * @param event - The originating click event
   */
  protected _onPick(event: JQuery.ClickEvent): Promise<FilePicker.Result> | undefined;

  /**
   * Handle backwards navigation of the fol6der structure
   */
  protected _onClickDirectoryControl(
    event: JQuery.ClickEvent
  ):
    | ReturnType<this['browse']>
    | Promise<ReturnType<this['browse']> | void | null>
    | ReturnType<typeof FilePicker['configurePath']>;

  /**
   * Present the user with a dialog to create a subdirectory within their currently browsed file storate location.
   */
  protected _createDirectoryDialog(source: FilePicker.Source): Promise<ReturnType<this['browse']> | void | null>;

  /**
   * Handle changes to the bucket selector
   */
  protected _onChangeBucket(event: JQuery.ChangeEvent): ReturnType<this['browse']>;

  /**
   * @param event - (unused)
   * @override
   */
  protected _onSearchFilter(event: KeyboardEvent, query: string, rgx: RegExp, html: HTMLElement): void;

  /**
   * Handle file picker form submission
   */
  protected _onSubmit(ev: Event): void;

  /**
   * Handle file upload
   */
  protected _onUpload(ev: Event): Promise<void>;

  /**
   * Bind the file picker to a new target field.
   * Assumes the user will provide a <button> HTMLElement which has the data-target and data-type attributes
   * The data-target attribute should provide the name of the input field which should receive the selected file
   * The data-type attribute is a string in ["image", "audio"] which sets the file extensions which will be accepted
   *
   * @param button  - The button element
   */
  static fromButton(button: HTMLButtonElement): FilePicker;

  /**
   * Record the last-browsed directory path so that re-opening a different FilePicker instance uses the same target
   * @defaultValue `''`
   */
  static LAST_BROWSED_DIRECTORY: string;

  /**
   * Record the last-configured tile size which can automatically be applied to new FilePicker instances
   * @defaultValue `null`
   */
  static LAST_TILE_SIZE: number | null;

  /**
   * Record the last-configured display mode so that re-opening a different FilePicker instance uses the same mode.
   * @defaultValue `FilePicker.DisplayModes.List`
   */
  static LAST_DISPLAY_MODE: string;

  /**
   * Enumerate the allowed FilePicker display modes
   */
  static DISPLAY_MODES: ['list', 'thumbs', 'tiles', 'images'];

  /**
   * Cache the names of S3 buckets which can be used
   * @defaultValue `null`
   */
  static S3_BUCKETS: string[] | null;
}

declare namespace FilePicker {
  interface BrowsingOptions {
    /**
     * A bucket within which to search if using the S3 source
     */
    bucket: string;

    /**
     * An Array of file extensions to filter on
     */
    extensions: string[];

    /**
     * The requested dir represents a wildcard path
     */
    wildcard: string;
  }

  interface Data {
    bucket: string | null;
    canGoBack: boolean;
    canUpload: boolean;
    canSelect: boolean;
    cssClass: string;
    dirs: Dir[];
    displayMode: string;
    extensions: string[];
    files: File[];
    isS3: boolean;
    noResults: boolean;
    request: string;
    source: Source;
    sources: Sources;
    target: string;
    tileSize: number | null;
    user: Game['user'];
  }

  interface Dir {
    name: string;
    path: string;
    private: boolean;
  }

  type DisplayMode = ValueOf<typeof FilePicker['DISPLAY_MODES']>;

  interface File {
    name: string;
    url: string;
    img: string;
  }

  interface ManageData {
    action: 'browseFiles' | 'configurePath' | 'createDirectory' | 'manageFiles';
    source: string;
    target: string;
  }

  interface Options extends Application.Options {
    current?: FilePicker['request'];

    activeSource?: FilePicker['activeSource'];

    type?: FilePicker['type'];

    field?: FilePicker['field'];

    button?: FilePicker['button'];

    callback?: (path: string) => void;

    /**
     * @defaultValue `'templates/apps/filepicker.html'`
     */
    template: string;

    /**
     * @defaultValue `['filepicker']`
     */
    classes: string[];

    /**
     * @defaultValue `520`
     */
    width: number;

    tabs: Array<
      Tabs.Options & {
        /**
         * @defaultValue `'.tabs'`
         */
        navSelector: string;
      }
    >;

    dragDrop: Array<
      DragDrop.Options & {
        /**
         * @defaultValue `'.file'`
         */
        dragSelector: string;

        /**
         * @defaultValue `'.filepicker-body'`
         */
        dropSelector: string;
      }
    >;

    /**
     * @defaultValue `false`
     */
    tileSize: boolean;

    filters: Array<
      SearchFilter.Options & {
        /**
         * @defaultValue `'input[name="filter"]'`
         */
        inputSelector: string;

        /**
         * @defaultValue `'.filepicker-body'`
         */
        contentSelector: string;
      }
    >;
  }

  interface Result {
    bucket?: string;
    target: string;
  }

  interface Source {
    target: string;
    label: string;
    icon: string;
  }

  interface Sources {
    data: Source;
    public: Source;
    s3: Source & {
      buckets: string[];
      bucket: string;
    };
  }
}
