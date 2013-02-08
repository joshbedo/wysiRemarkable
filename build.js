(function( $, window, document, undefined) {
	$.fn.wysiRemarkable = function (method) {
		if (methods[method])
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method === 'object' || !method)
			return methods.init.apply(this, arguments);
		else
			$.error('wysiRemarkable is pretty smart but ' + method + ' does not exists, so I am not sure what to do...');
    };


    var methods = {},

    defaults = {
    	toolbarID: 'wysiRemarkable-toolbar',
    	toolbarCss: {
    		position:'fixed',
    		top:'0px',
    		left:'0px',
    		width:'100%',
    		textAlign:'center',
    		zIndex:'2000'
    	},
    	toolbar: 'save, editable, code, |, undo, redo, |, format, |, alignleft, aligncenter, alignright, justify, |, bold, italic, underline, |, orderedlist, unorderedlist, |, link, unlink',
	    commands: {
            save: {
            	type: 'action',
            	command: 'save',
            	ui: false,
            	value: null,
            	text: '',
            	displayClass: 'wysiRemarkable-icon-save',
            	enabled: true,
            	click: function() { console.log(methods.save()); }
            },
            editable: {
                type: 'action',
                command: 'changeState',
                ui: false,
                value: false,
                text: '',
                displayClass: 'wysiRemarkable-icon-editable-false',
                enabled: true,
                click: function() {
                	var $self = toolbar.find('.wysiRemarkable-icon-editable-'+this.value).parent().find('span');
                	$('[contenteditable="'+this.value+'"]').attr('contenteditable', !this.value);
                	this.value = !this.value;
    				methods.toggleButtons(this.value, $self.parent());
                	$self.removeClass('wysiRemarkable-icon-editable-'+!this.value).addClass('wysiRemarkable-icon-editable-'+this.value);
					toolbar.find('.wysiRemarkable-icon-save').parent().removeClass('disabled');
                }
            },
	    	code: {
	    		type: 'action',
	    		command: 'changeview',
	    		ui: false,
	    		value: false,
	    		text: '',
	    		displayClass: 'wysiRemarkable-icon-code',
	    		click: function() {
	    			var $self = toolbar.find('.wysiRemarkable-icon-code').parent().find('span');
	    			$('[contenteditable="true"]').each(function() {	
	    				if ($(this).css('white-space') != "pre")
	    				 	$(this).text($(this).html()).css({ 'white-space':'pre', 'overflow': 'auto'  });
	    				else
	    				 	$(this).html($(this).text()).css({ 'white-space':'normal' });
    				});
    				methods.toggleButtons(this.value, $self.parent());
    				this.value = !this.value;
    			}	
    		},
    		undo: {
    			type: 'command',
    			command: 'undo',
    			ui: false,
    			value: null,
    			text: '',
    			displayClass: 'wysiRemarkable-icon-undo'
    		},
    		redo: {
    			type: 'command',
    			command: 'redo',
    			ui: false,
    			value: null,
    			text: '',
    			displayClass: 'wysiRemarkable-icon-redo'
    		},
    		redo: {
    			type: 'command',
    			command: 'redo',
    			ui: false,
    			value: null,
    			text: '',
    			displayClass: 'wysiRemarkable-icon-redo'
    		},
    		bold: {
    			type: 'command',
    			command: 'bold',
    			ui: false,
    			value: null,
    			text: '',
    			displayClass: 'wysiRemarkable-icon-bold'
    		},
    		italic: {
    			type: 'command',
    			command: 'italic',
    			ui: false,
    			value: null,
    			text: '',
    			displayClass: 'wysiRemarkable-icon-italic'
    		},
            alignleft: {
                type: 'command',
                command: 'justifyLeft',
                ui: false,
                value: null,
                text: '',
                displayClass: 'wysiRemarkable-icon-alignleft'
            },
            aligncenter: {
                type: 'command',
                command: 'justifyCenter',
                ui: false,
                value: null,
                text: '',
                displayClass: 'wysiRemarkable-icon-aligncenter'
            },
            alignright: {
                type: 'command',
                command: 'justifyRight',
                ui: false,
                value: null,
                text: '',
                displayClass: 'wysiRemarkable-icon-alignright'
            },
            justify: {
                type: 'command',
                command: 'justifyFull',
                ui: false,
                value: null,
                text: '',
                displayClass: 'wysiRemarkable-icon-justify'
            },
            underline: {
                type: 'command',
                command: 'underline',
                ui: false,
                value: null,
                text: '',
                displayClass: 'wysiRemarkable-icon-underline'
            },
            unorderedlist: {
                type: 'command',
                command: 'insertUnorderedList',
                ui: false,
                value: null,
                text: '',
                displayClass: 'wysiRemarkable-icon-unorderedlist'
            },
            orderedlist: {
                type: 'command',
                command: 'insertOrderedList',
                ui: false,
                value: null,
                text: '',
                displayClass: 'wysiRemarkable-icon-orderedlist'
            },
            link: {
            	type: 'action',
            	command: 'createLink',
            	ui: true,
            	value: null,
            	text: '',
            	displayClass: 'wysiRemarkable-icon-link',
            	click: function() { $('#wysiRemarkable-createLink').modal('show'); },
            	modal: {
            		header: 'Insert Link',
            		body: '',
            		footer: { insert: { class: 'btn-primary', text: 'Insert Link', click: function() { } } }
            	}
            },
            unlink: {
            	type: 'command',
            	command: 'unlink',
            	ui: false,
            	value: null,
            	text: '',
            	displayClass: 'wysiRemarkable-icon-unlink'
            },
            format: {
            	type: 'action',
            	command: 'formatblock',
            	ui: false,
            	value: null,
            	text: '',
            	displayClass: 'wysiRemarkable-icon-format',
            	dropdown: {
            		h1: {
            			type: 'command',
            			command: 'formatblock',
            			ui: false,
            			value: 'h1',
            			text: 'Header 1',
            			displayClass: ''
            		},
            		h2: {
            			type: 'command',
            			command: 'formatblock',
            			ui: false,
            			value: 'h2',
            			text: 'Header 2',
            			displayClass: ''
            		},
            		h3: {
            			type: 'command',
            			command: 'formatblock',
            			ui: false,
            			value: 'h3',
            			text: 'Header 3',
            			displayClass: ''
            		},
            		h4: {
            			type: 'command',
            			command: 'formatblock',
            			ui: false,
            			value: 'h4',
            			text: 'Header 4',
            			displayClass: ''
            		},
            		h5: {
            			type: 'command',
            			command: 'formatblock',
            			ui: false,
            			value: 'h5',
            			text: 'Header 5',
            			displayClass: ''
            		},
            		h6: {
            			type: 'command',
            			command: 'formatblock',
            			ui: false,
            			value: 'h6',
            			text: 'Header 6',
            			displayClass: ''
            		},
            		p: {
            			type: 'command',
            			command: 'formatblock',
            			ui: false,
            			value: 'p',
            			text: 'Paragraph',
            			displayClass: ''
            		}
            	}
            }
    	}
   	},

    toolbar = $('<div class="well well-small" />');

    methods.init = function (options, arguments) {
    	var overwrite = options;
    	return this.each(function () {
    		var options = $.extend({}, defaults, overwrite),
    		self = this;
    		toolbar.css( options.toolbarCss ).addClass(options.toolbarID);
    		$('body').append(toolbar)
    		methods.buildToolbar(options);
    		methods.displayState();
    	});
    };

    methods.buildToolbar = function(options) {
    	var btnGroup = methods.trim(options.toolbar).split(',|,'),
    		commands = options.commands,
    		buttons, command, btnContainerHTML, btnHTML;
    	for (var groupElements in btnGroup) {
			buttons = btnGroup[groupElements].split(',');
			btnContainerHTML = $('<div class="btn-group" />');
			for (var button in buttons){
				var disabled = ' disabled', dropdown;
				command = commands[buttons[button]];
				if (command.enabled == true) disabled = '';
				btnHTML = $('<button class="btn'+disabled+'" data-wysiRemarkable-'+command.type+'="'+command.command+'" data-wysiRemarkable-ui="'+command.ui+'" data-wysiRemarkable-value="'+command.value+'">').html('<span aria-hidden="true" class="'+command.displayClass+'">'+command.text+'</span>').data("command_name", command).on('click',  function () { 
					if (!$(this).hasClass('disabled')) 
						if ($.isFunction($(this).data("command_name").click))
							$(this).data("command_name").click(); 
						else
							methods.command($(this).data("command_name").command, $(this).data("command_name").ui, $(this).data("command_name").value);
				});
				var dropdownHTML = "";
				if (command.dropdown) {
					btnHTML.append('<span class="caret"></span>').addClass('dropdown-toggle').attr('data-toggle', 'dropdown');
					dropdownHTML = $('<ul class="dropdown-menu"/>');
					for (var dropdownItem in command.dropdown){
						var dropdownCommand = command.dropdown[dropdownItem], dropdownItems;
						dropdownItems = $('<li />').append('<button class="btn btn-link" style="width:100%;text-align:left;" data-wysiwyg-'+dropdownCommand.type+'="'+dropdownCommand.command+' data-wysiwyg-ui="'+dropdownCommand.ui+'" data-wysiwyg-value="'+dropdownCommand.value+'" />')//.html('<span aria-hidden="true" class="'+dropdownCommand.displayClass+'"></span>'+dropdownCommand.text);
						dropdownItems.find('button').html('<'+dropdownCommand.value+'><span aria-hidden="true" class="'+dropdownCommand.displayClass+'"></span>'+dropdownCommand.text+'</'+dropdownCommand.value+'>').data("command_name", dropdownCommand).on('click',  function () { 
								if (!$(this).hasClass('disabled')) 
									if ($.isFunction($(this).data("command_name").click))
										$(this).data("command_name").click(); 
									else
										methods.command($(this).data("command_name").command, $(this).data("command_name").ui, $(this).data("command_name").value);
						});
						dropdownHTML.append(dropdownItems);
					}
				}
				if (command.modal)
					methods.buildModal(command);

				btnContainerHTML.append(btnHTML);
				btnContainerHTML.append(dropdownHTML);
			}
			toolbar.append(btnContainerHTML)
			btnContainerHTML = null;
			btnHTML = null;
		}
    };

    methods.trim = function(str) { return str.replace(/\s/g, ''); };

    methods.toggleButtons = function(bool, keepEnabled) {
		if (bool)
			toolbar.find('button.disabled').removeClass('disabled');
		else
			toolbar.find('button').addClass('disabled');
		keepEnabled.removeClass('disabled');
    };

    methods.command = function(cmdID, showUI, value){ document.execCommand(cmdID, showUI, value); }

    methods.displayState = function() {
	   setInterval(function () {
		   $('[data-wysiRemarkable-ui="false"]').each(function( index ) {
		        var state = $(this).data('wysiremarkableCommand');
		        if (document.queryCommandState(state))
		            $('[data-wysiRemarkable-command="'+state+'"]').addClass('active');
		        else
		            $('[data-wysiRemarkable-command="'+state+'"]').removeClass('active');
		    });
		}, 100);
    };

    methods.save = function() { return $('[contenteditable="true"],[contenteditable="false"]'); }

    methods.saveselection = function () {
    	if (window.getSelection()) 
    		if (window.getSelection().getRangeAt && window.getSelection().rangeCount)
    			return window.getSelection().getRangeAt(0);
    	else if (document.selection && document.selection.createRange) 
    		return document.selection.createRange();
    	return null;
    };

    methods.restoreSelection = function (storedRange) {
    	if (storedRange) {
    		if (window.getSelection) {
    			window.getSelection().removeAllRanges();
    			window.addRange(storedRange);
    		} else if (document.selection && range.select)
    			storedRange.select();
    	}
    };

    methods.getSelectedHTML = function() {
    	var html = "";
    	if (typeof window.getSelection != "undefined") {
    		if (window.getSelection().rangeCount) {
    			var container = document.createElement("div");
    			for (var i = 0, len = window.getSelection().rangeCount; i < len; ++i) 
    				container.appendChild(window.getSelection().getRangeAt(i).cloneContents());
    			html = container.innerHTML;
    		}
    	} else if (typeof document.selection != "undefined") 
    		if (document.selection.type == "Text") 
    			html = document.selection.createRange().htmlText;
    	return html
    };

    methods.inserthtml = function (tag) { methods.command('insertHTML', false, ''); };

    methods.buildModal = function(info) {
    	var $header = $('<div id="wysiRemarkable-'+info.command+'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="wysiRemarkable-'+info.command+'" aria-hidden="true">')
    				 .html('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="wysiRemarkable-'+info.command+'">'+info.modal.header+'</h3></div>'),
      		$body   = $('<div class="modal-body">').html(info.modal.body),
      		$footer = $('<div class="modal-footer">'),
      		$buttons;//.html('<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');
      		for (var buttons in info.modal.footer){
      			$buttons = $('<button class="btn '+info.modal.footer[buttons].class+'" aria-hidden="true" />').html(info.modal.footer[buttons].text);
      			$footer.append($buttons);
      		}
      	$('body').append(($header.append($body).append($footer)));
    }

})( jQuery, window, document );