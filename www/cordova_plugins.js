cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.contacts/www/contacts.js",
        "id": "org.apache.cordova.contacts.contacts",
        "clobbers": [
            "navigator.contacts"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.contacts/www/Contact.js",
        "id": "org.apache.cordova.contacts.Contact",
        "clobbers": [
            "Contact"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.contacts/www/ContactAddress.js",
        "id": "org.apache.cordova.contacts.ContactAddress",
        "clobbers": [
            "ContactAddress"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.contacts/www/ContactError.js",
        "id": "org.apache.cordova.contacts.ContactError",
        "clobbers": [
            "ContactError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.contacts/www/ContactField.js",
        "id": "org.apache.cordova.contacts.ContactField",
        "clobbers": [
            "ContactField"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.contacts/www/ContactFindOptions.js",
        "id": "org.apache.cordova.contacts.ContactFindOptions",
        "clobbers": [
            "ContactFindOptions"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.contacts/www/ContactName.js",
        "id": "org.apache.cordova.contacts.ContactName",
        "clobbers": [
            "ContactName"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.contacts/www/ContactOrganization.js",
        "id": "org.apache.cordova.contacts.ContactOrganization",
        "clobbers": [
            "ContactOrganization"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/android/notification.js",
        "id": "org.apache.cordova.dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/DirectoryEntry.js",
        "id": "org.apache.cordova.file.DirectoryEntry",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/DirectoryReader.js",
        "id": "org.apache.cordova.file.DirectoryReader",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Entry.js",
        "id": "org.apache.cordova.file.Entry",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/File.js",
        "id": "org.apache.cordova.file.File",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileEntry.js",
        "id": "org.apache.cordova.file.FileEntry",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileError.js",
        "id": "org.apache.cordova.file.FileError",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileReader.js",
        "id": "org.apache.cordova.file.FileReader",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileSystem.js",
        "id": "org.apache.cordova.file.FileSystem",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileUploadOptions.js",
        "id": "org.apache.cordova.file.FileUploadOptions",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileUploadResult.js",
        "id": "org.apache.cordova.file.FileUploadResult",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileWriter.js",
        "id": "org.apache.cordova.file.FileWriter",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Flags.js",
        "id": "org.apache.cordova.file.Flags",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/LocalFileSystem.js",
        "id": "org.apache.cordova.file.LocalFileSystem",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Metadata.js",
        "id": "org.apache.cordova.file.Metadata",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/ProgressEvent.js",
        "id": "org.apache.cordova.file.ProgressEvent",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/requestFileSystem.js",
        "id": "org.apache.cordova.file.requestFileSystem",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/resolveLocalFileSystemURI.js",
        "id": "org.apache.cordova.file.resolveLocalFileSystemURI",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/android/FileSystem.js",
        "id": "org.apache.cordova.file.androidFileSystem",
        "merges": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-transfer/www/FileTransferError.js",
        "id": "org.apache.cordova.file-transfer.FileTransferError",
        "clobbers": [
            "window.FileTransferError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-transfer/www/FileTransfer.js",
        "id": "org.apache.cordova.file-transfer.FileTransfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.globalization/www/GlobalizationError.js",
        "id": "org.apache.cordova.globalization.GlobalizationError",
        "clobbers": [
            "window.GlobalizationError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.globalization/www/globalization.js",
        "id": "org.apache.cordova.globalization.globalization",
        "clobbers": [
            "navigator.globalization"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.media/www/MediaError.js",
        "id": "org.apache.cordova.media.MediaError",
        "clobbers": [
            "window.MediaError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.media/www/Media.js",
        "id": "org.apache.cordova.media.Media",
        "clobbers": [
            "window.Media"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-system-roots/FileSystemRoots.js",
        "id": "org.apache.cordova.file-system-roots.FileSystemRoots",
        "clobbers": [
            "cordova.filesystem"
        ]
    },
    {
        "file": "plugins/com.baidu.fex.here.camera/www/here.js",
        "id": "com.baidu.fex.here.camera.here",
        "clobbers": [
            "here"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.camera/www/CameraConstants.js",
        "id": "org.apache.cordova.camera.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.camera/www/CameraPopoverOptions.js",
        "id": "org.apache.cordova.camera.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.camera/www/Camera.js",
        "id": "org.apache.cordova.camera.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.camera/www/CameraPopoverHandle.js",
        "id": "org.apache.cordova.camera.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "file": "plugins/com.baidu.fex.here.resizeImage/www/imageresize.js",
        "id": "com.baidu.fex.here.resizeImage.resizeImage",
        "clobbers": [
            "resizeImage"
        ]
    },
    {
        "file": "plugins/com.baidu.fex.here.share/www/share.js",
        "id": "com.baidu.fex.here.share",
        "clobbers": [
            "nativeshare"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.console": "0.2.7",
    "org.apache.cordova.contacts": "0.2.9",
    "org.apache.cordova.dialogs": "0.2.6",
    "org.apache.cordova.file": "1.0.1",
    "org.apache.cordova.file-transfer": "0.4.2",
    "org.apache.cordova.globalization": "0.2.6",
    "org.apache.cordova.media": "0.2.9",
    "org.apache.cordova.splashscreen": "0.2.7",
    "org.apache.cordova.vibration": "0.3.7",
    "org.apache.cordova.file-system-roots": "0.2.0-dev",
    "com.baidu.fex.here.camera": "0.0.1",
    "org.apache.cordova.camera": "0.2.8",
    "com.baidu.fex.here.resizeImage": "1.0.0",
    "com.baidu.fex.here.share": "1.0.0"
}
// BOTTOM OF METADATA
});