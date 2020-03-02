var Table = Table || {};

Table.Sortable = (function() {
	
	function Sortable() {
		originalTable = '';
		initialTable = '';
		initialUsersId = '';
		finalUsersId = '';

		this.btnSort = $('#btnSort');
		this.btnCancel = $('#btnCancelSort');		
		this.btnSave = $('#btnSaveSort');			
		this.btnReset = $('#btnResetOriginalOrder');			
		this.tableTitle = $('.title-users');
		this.divOrderingMenu = $('.ordering-menu');		
		this.table = $('.table-users');				
		this.inputHiddenIdUsers = $('#inputHiddenIdUsers');
		this.divResetMenu = $('.ordering-menu-reset');
		this.form = $('#formReorderUsers');											
	}
				
	Sortable.prototype.start = function() {	
		this.btnSort.on('click', onInitilize.bind(this));
		this.btnCancel.on('click', onCancel.bind(this));
		this.btnSave.on('click', onSave.bind(this));	
		this.btnReset.on('click', onReset.bind(this));	

		originalTable = this.table.html();		
	}
	
	function onInitilize() {		
		initialTable = this.table.html();		
		initialUsersId = idUsers(this.table);

		this.btnSort.css({'display': 'none'});		
		this.tableTitle.css({'display': 'none'});
		this.divOrderingMenu.css({'max-height':'111px', 'opacity':'1', 'left':'0'});			

		this.table.addClass('sortable-table');	
		
		this.table.find('tbody').sortable({
			update: function(event, ui) {
				finalUsersId = idUsers($(this).parent());
				if (initialUsersId == finalUsersId)
					$('#btnSaveSort').attr('disabled', 'disabled');
				else
					$('#btnSaveSort').removeAttr('disabled');
			}
		});
		// this.table.find('tbody').disableSelection();
	}
	
	function onCancel() {	
		reset.call(this);		
		this.table.html(initialTable);
	}
	
	function onSave() {				
		initialUsersId = idUsers('<table>' + originalTable + '</table>');
		finalUsersId = idUsers(this.table);				

		this.inputHiddenIdUsers.val(finalUsersId);		
		
		if (initialUsersId == finalUsersId) {						
			hideResetMenu.call(this);
		} else {
			showResetMenu.call(this);			
		}

		reset.call(this);		
		this.table.html(this.table.html());		
	}

	function onReset() {
		reset.call(this);				
		hideResetMenu.call(this);
		this.table.html(originalTable);		
	}

	function showResetMenu() {		
		this.divResetMenu.css({'max-height':'111px', 'opacity':'1', 'left':'0'});
	}

	function hideResetMenu() {
		this.divResetMenu.css({'max-height':'0', 'opacity':'0','left':'-999px'});		
	}

	function reset() {		
		this.btnSort.css({'display': 'inline-block'});
		this.tableTitle.css({'display': 'inline-block'});
		this.divOrderingMenu.css({'max-height':'0', 'opacity':'0','left':'-999px'});		
		this.table.removeClass('sortable-table');
		this.btnSave.attr('disabled', 'disabled');		
		finalUsersId = '';				
	}
		
	function idUsers(table) {		
		var idDocs = '';
		
		$(table).find('tbody').find('tr').each(function(index) {
			id = this.children[0].textContent.trim();
			
			if ($.isNumeric(id)) {
				if (idDocs.length > 0) idDocs += ";";
				idDocs += id;	
			}									
		});	
		
		return idDocs;
	}	
				
	return Sortable;
	
}());

$(function() {	
	var Sortable = new Table.Sortable();
	Sortable.start();	
});