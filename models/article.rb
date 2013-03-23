require 'data_mapper'
require './models/draft.rb'
require "./models/tag.rb"
require "./models/user.rb"
require "./models/location.rb"

class Article
	include DataMapper::Resource

	property :id,	Serial
	property :headline,	Text
	property :body_md, 	Text
	property :body_html, Text
	
	property :source,	Text
	property :alt_text, Text
	property :permalink,Text
	property :lede,		Text
	
	property :status, String # ArticleStatusIdea, ArticleStatusPublished, ArticleStatusLinkQueue, ArticleStatusInTheVault
	
	# Vault stuff
	property :vault_entrance_date, DateTime
	property :vault_release_date, DateTime
	property :vault_notes, Text # Any hints as to WHY this is being put in the Vault.
	
	property :legacy_file_name_js, String
	property :legacy_file_name_md, String
	
	property :created_at,	DateTime
	property :updated_at, 	DateTime
	property :published_at, DateTime
	
	#need relationship to an author, a location, tags
	has n, :drafts
	belongs_to :user
	
	has n, :tags, :through => Resource
	has n, :locations, :through => Resource
	
end