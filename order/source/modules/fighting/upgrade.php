<?php
	pdo_query( "alter table `ims_fighting_question_bank` drop column option_num  ");
	
	
	pdo_query( "delete from `ims_fighting_question_bank` ");
