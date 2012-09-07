<?php

/**
 * @file
 * Administration functions for invite module.
 */

/**
 * Menu callback; display invite settings form.
 */
function imodify_popup_menu_all() {

  $type = ($_POST['type'] == 'imodify_popup') ? 'menu-popup' : $_POST['type'].'-popup';
  $query = db_select('imodify_popup', 'ip');
  $query->fields('ip'); // SELECT the fields from file_usage
  $query->condition('ip.popup_type', $type, '=');
  $query = $query->extend('TableSort')->extend('PagerDefault')->limit(3);
  $result = $query->execute();
  $header = array('Title', 'Message', 'Message Counter');
  $rows = array();
  while($data = $result->fetchObject()){
    // Fill the table rows
    $rows[] = array(
      $data->popup_title,
      $data->popup_message,
      $data->popup_counter
    );
  }
  $output = theme_table(
    array(
      "header" => $header,
      "rows" => $rows,
      "attributes" => array(),
      "sticky" => true, // Table header will be sticky
      "caption" => "",
      "colgroups" => array(),
      "empty" => t("Table has no row!") // The message to be displayed if table is empty
    )
  ).theme("pager");
  print $output;
}

function imodify_popup_menu_all_ajax() {
  $query = db_select('imodify_popup', 'ip');
  $query->fields('ip'); // SELECT the fields from file_usage
  $query->condition('ip.popup_type', 'menu-popup', '=');
  $result = $query->execute();
  $header = array('Title', 'Message', 'Message Counter');
  $rows = array();
  while($data = $result->fetchObject()){
    // Fill the table rows
    $rows[] = array(
                'title' => $data->popup_title,
                'message' =>$data->popup_message,
                'message_counter' =>$data->popup_counter
              );
  }
  print json_encode($rows);
}
