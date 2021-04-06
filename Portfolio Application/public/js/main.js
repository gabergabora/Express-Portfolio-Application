$(document).ready(function(){
	$('.btn-danger').on('click', function(){
		var id = $(this).data('id');
		var url = '/admin/delete/'+id;
		if(confirm('Delete Course?')){
			$.ajax({
				url: url,
				type:'DELETE',
				success: function(result){
					window.location = '/';
				}, error: function(err){
					console.log(err);
				}
			});
		}
	});
});
